import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { userCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { hashPassword } from "../../util/bcryptUtil";
import { exit } from 'process';


async function userSQLSeed() {
    let currentConnection;
    try {
        currentConnection = await sqlConnect();

        // await dropQuery(currentConnection);

        await currentConnection.query(userCreateQuery);

        for (let i = 0; i < 15; i++) {

            const rawPassword = faker.internet.password({ length: 10, memorable: true });
            const hashedPassword = hashPassword(rawPassword);

            await currentConnection.query(`
            INSERT INTO employee 
            ( full_name, contact, email, photo, start_date, description, status, position, password)
            VALUES (?,?,?,?,?,?,?,?, ?)`
                , [
                    faker.person.fullName(),
                    faker.phone.number().toString(),
                    faker.internet.email(),
                    faker.image.avatar(),
                    faker.date.past({ years: 10, refDate: '2024-04-01' }),
                    faker.lorem.paragraph(2),
                    true,
                    faker.helpers.arrayElement(["Manager", "Reception", "Room Service"]),
                    hashedPassword
                ]
            );
        }
    } catch (error) {
        console.log(error);
    } finally {
        currentConnection?.release();
        exit(1);
    }
};

userSQLSeed();