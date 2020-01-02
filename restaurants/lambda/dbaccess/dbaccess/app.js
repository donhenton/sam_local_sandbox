var AWS = require('aws-sdk'),
    documentClient = new AWS.DynamoDB.DocumentClient();
var getAllRestaurants = require('./methods/getAllRestaurants');

exports.lambdaHandler = async(event, context) => {
    let bodyObj = {
        method: "NONE",
        restaurantId: null,
        reviewId: null,
        shouldDo: null
    };
    const response = {
        'statusCode': 200,
        'body': JSON.stringify(bodyObj)
    }

    try {
        bodyObj.method = event.httpMethod;
        if (!event.pathParameters) {

            if (event.httpMethod === 'GET') {
                bodyObj.shouldDo = 'get all restaurants';
                const restaurantData = await getAllRestaurants(documentClient);
                response.body = JSON.stringify(restaurantData);
                return response;

            } else {
                bodyObj.shouldDo = 'add a restaurant'; //POST
            }
            response.body = JSON.stringify(bodyObj);
            return response;
        }

        if (event.pathParameters['restaurantId'] && !event.pathParameters['reviewId']) {
            if (event.httpMethod === 'GET') {
                bodyObj.shouldDo = 'get single restaurant';
            }
            if (event.httpMethod === 'DELETE') {
                bodyObj.shouldDo = 'delete a restaurant and reviews';
            }
            if (event.httpMethod === 'PUT') {
                bodyObj.shouldDo = 'update a restaurant';
            }

            bodyObj.restaurantId = event.pathParameters['restaurantId'];
            response.body = JSON.stringify(bodyObj);
            return response;
        }

        if (event.pathParameters['restaurantId'] && event.pathParameters['reviewId']) {
            if (event.httpMethod === 'POST') {
                bodyObj.shouldDo = 'add a review for a restaurant';
            }
            if (event.httpMethod === 'DELETE') {
                bodyObj.shouldDo = 'delete a review for a restaurant';
            }
            if (event.httpMethod === 'PUT') {
                bodyObj.shouldDo = 'update a review for a restaurant';
            }

            bodyObj.restaurantId = event.pathParameters['restaurantId'];
            bodyObj.reviewId = event.pathParameters['reviewId'];
            response.body = JSON.stringify(bodyObj);
            return response;
        }


    } catch (err) {
        console.log(err);
        response.body = JSON.stringify({
            error: err.message
        });
    }

    return response;
}