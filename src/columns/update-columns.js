import handler from "../lib/handler-lib";
import dynamoDb from "../lib/dynamodb-lib";

export const main = handler(async (event, context) => {
    let data = JSON.parse(event.body);
    data.content.updatedAt = Date.now();
    /*
        // I am  only storing 1 record in the columns tables - the record consists of all the columns
        // I realize this is a little unusual, generally it would probably be preferred to create a
        // table storing each column as a secord record and a second table containing 1 record
        // containing the list columns in order.
        //
        // I went with this approach because this application has all the data synchronized between
        // everyone.  The number of columns is going to be limited (too many columns will make the application
        // to difficult for a user to work with).  In a larger application this approach would not work as it
        // would make the columns record too large.
    */
    const params = {
        TableName: "Columns",
        Key: {
            ColumnsID: event.pathParameters.id
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
