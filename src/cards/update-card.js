import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    let data = JSON.parse(event.body);

    const params = {
        TableName: "Card",
        Key: {
            cardID: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content",
        ExpressionAttributeValues: {
            ":content": data.content || null,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
});
