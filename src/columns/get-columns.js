import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: "Columns",
        Key: {
            ColumnsID: event.pathParameters.id
        },
    };

    try {
        let result = await dynamoDb.get(params);

        if (result.Item)
            return result.Item;
    } catch (error) {
        console.log("Error getting columns " + error);
        throw error;
    }
});