var dynamodbUpdateExpression = require('dynamodb-update-expression');
// https://dzone.com/articles/update-dynamodb-items-withnbspnodejs
// https://github.com/4ossiblellc/dynamodb-update-expression#optionsarraymerge-only-for-update

putRestaurant = async function(client, restaurantUpdates, currentRestaurant) {
    // const restaurantParm = {
    //     TableName: 'Restaurants',
    //     KeyConditionExpression: 'id = :r_id',
    //     ExpressionAttributeValues: { ':r_id': restaurantId }
    // }

    return new Promise(function(resolve, reject) {

        var updateExpression = dynamodbUpdateExpression.getUpdateExpression(currentRestaurant, restaurantUpdates);
        updateExpression['TableName'] = 'Restaurants';
        updateExpression['Key'] = { "id": currentRestaurant.id };
        if (Object.keys(updateExpression.ExpressionAttributeValues).length === 0) {
            //occurs when the change requested will not change the object
            resolve(null);
            return;
        }
        if (!currentRestaurant) {
            resolve(null);
            return;

        }

        client.update(updateExpression, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });

}
module.exports = putRestaurant;