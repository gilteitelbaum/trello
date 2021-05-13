import * as uuid from "uuid";
import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "Card",
        Item: {
            cardID: uuid.v1(),
            createdAt: Date.now(),
            content: data.content
        }
    };

    try {
        await dynamoDb.put(params);
    } catch (error) {
        console.log("Error creating card record" + error);
        throw error;
    }

    return params.Item;
});