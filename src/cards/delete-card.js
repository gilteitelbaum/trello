import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: "Card",
        Key: {
            cardID: event.pathParameters.id
        },
    };

    await dynamoDb.delete(params);

    return { status: true };
});