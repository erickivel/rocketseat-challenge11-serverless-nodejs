import { v4 as uuidv4 } from "uuid";
import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
    title: string;
    deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
    const { userid } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

    await document.put({
        TableName: "todos",
        Item: {
            id: uuidv4(),
            user_id: userid,
            title,
            done: false,
            deadline: new Date(deadline).toUTCString()
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo Created"
        })
    };
};