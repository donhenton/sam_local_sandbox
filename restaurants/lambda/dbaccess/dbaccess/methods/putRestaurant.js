var dynamodbUpdateExpression = require('dynamodb-update-expression');
// https://dzone.com/articles/update-dynamodb-items-withnbspnodejs
// https://github.com/4ossiblellc/dynamodb-update-expression#optionsarraymerge-only-for-update

putRestaurant = async function(client, restaurantUpdates, currentRestaurant) {


    return new Promise(function(resolve, reject) {

        var updateExpression = dynamodbUpdateExpression.getUpdateExpression(currentRestaurant, restaurantUpdates);
        updateExpression['TableName'] = 'Restaurants';
        updateExpression['Key'] = { "id": currentRestaurant.id };
        if (Object.keys(updateExpression.ExpressionAttributeValues).length === 0) {
            //occurs when the change requested will not change the object
            resolve({ statusCode: 200, body: {} });
            return;
        }
        if (!currentRestaurant) {
            resolve({ statusCode: 404, body: {} });
            return;

        }

        client.update(updateExpression, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ statusCode: 201, body: data })
            }
        });
    });

}
module.exports = putRestaurant;