import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "Columns",
        Item: {
            ColumnsID: "1",
            createdAt: Date.now(),
            content: data.content
        }
    };

    try {
        await dynamoDb.put(params);
    } catch (error) {
        console.log("Error creating columns record" + error);
        throw error;
    }

    return params.Item;
});