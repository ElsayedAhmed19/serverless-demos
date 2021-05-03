import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

var docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newItem = {
        id: uuid.v4(),
        ...JSON.parse(event.body)
    }

    await docClient.put({
        TableName: process.env.GROUPS_TABLE,
        Item: newItem
    }).promise()

    const response = {
        statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
            newItem
        })
    };
    return response;
};