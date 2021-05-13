import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: "Card",
        Key: {
            cardID: event.pathParameters.id
        },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Card not found.");
    }

    return result.Item;
});