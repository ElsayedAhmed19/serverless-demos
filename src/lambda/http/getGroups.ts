import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const result = await docClient.scan({
        TableName: process.env.GROUPS_TABLE //can got from process.env.GROUPS_TABLE after setting it in env varaibles
    }).promise()

    const items = result.Items

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
          items
        })
    };
    return response;
};
