import { app } from './app'
import serverless from 'serverless-http'

export const handler = serverless(app, {
    response: {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET,DELETE'
        }
    }
})