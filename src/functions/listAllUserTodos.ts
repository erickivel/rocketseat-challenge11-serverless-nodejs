import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
    const { userid: user_id } = event.pathParameters;

    const query = await document.query({
        TableName: "todos",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    }).promise();

    const allTodos = query.Items;

    return {
        statusCode: 200,
        body: JSON.stringify({
            todos: allTodos
        }),
    };
};