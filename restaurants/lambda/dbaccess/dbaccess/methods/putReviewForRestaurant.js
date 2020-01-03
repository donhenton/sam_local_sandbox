/**
 * delete a review for a restaurant  
 * returns {statusCode: 200/404, body: null} 404 if either restaurant or review not found
 * 
 */
var dynamodbUpdateExpression = require('dynamodb-update-expression');
putReviewForRestaurant = async function(client, restaurantId, reviewId, newReview) {


    var findReview = async function() {

        return new Promise(function(resolve, reject) {

            const returnValue = {
                statusCode: 200,
                body: null
            };

            const params = {
                TableName: "Reviews",
                KeyConditionExpression: 'id = :r_id AND restaurantId = :rest_id',
                ExpressionAttributeValues: {
                    ':rest_id': restaurantId,
                    ':r_id': reviewId
                }
            }
            client.query(params, (err, data) => {
                if (err) {
                    returnValue.body = err.message;
                    returnValue.statusCode = 500;
                    resolve(returnValue);
                } else {

                    if (data.Items.length === 0) {

                        returnValue.statusCode = 404;
                        returnValue.body = [];
                    } else {

                        returnValue.statusCode = 200;
                        returnValue.body = data.Items[0];
                    }
                    resolve(returnValue);
                }

            })

            return returnValue;

        });



    }
    let review = await findReview();


    if (review) {
        var updateExpression = dynamodbUpdateExpression.getUpdateExpression(review, newReview);
        updateExpression['TableName'] = 'Reviews';
        updateExpression['Key'] = {
            "id": reviewId,
            "restaurantId": restaurantId
        };

        if (Object.keys(updateExpression.ExpressionAttributeValues).length === 0) {
            //occurs when the change requested will not change the object
            resolve({ statusCode: 200, body: {} });
            return;
        }
        return new Promise((resolve, reject) => {
            client.update(updateExpression, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ statusCode: 201, body: {} })
                }
            });
        });

    } else {
        return Promise.reject({
            status: 404,
            body: {}
        });
    }

}


module.exports = putReviewForRestaurant;