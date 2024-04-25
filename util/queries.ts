import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { sqlConnect, sqlDisconnect } from "../databaseConfig";
import { longQuery } from "./queryArgs";
import { PoolConnection } from "mysql2/promise";

export const sqlQuery = async (
    sqlQuery: string,
    params?: any[]
): Promise<any> => {
    const connection = await sqlConnect();
    const preparedConnection = await connection.prepare(sqlQuery);

    const [results] = await preparedConnection.execute(params);
    preparedConnection.close();
    connection.unprepare(sqlQuery);
    sqlDisconnect(connection);
    return results;
};

export const dropTable = async (connection: PoolConnection, table: string): Promise<void> => {
    await connection.query(`DROP TABLE IF EXISTS ${table}`)
};

export const dropQuery = async (connection: PoolConnection) => {
    const queries = longQuery.split(';').filter(query => query.trim() !== '');

    console.log('Dropping tables');

    for (const query of queries) {
        await connection.query(query + ';');
    }

    console.log('Done');
}