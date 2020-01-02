var AWS = require('aws-sdk');

/* REMOVE DEV */
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-registering-certs.html
var https = require('https');
AWS.config.update({
    region: "us-east-2",
    httpOptions: {
        agent: new https.Agent({
            rejectUnauthorized: false
        })
    }
});
/* REMOVE DEV */



var documentClient = new AWS.DynamoDB.DocumentClient();
var getAllRestaurants = require('./methods/getAllRestaurants');
var postNewRestaurant = require('./methods/postNewRestaurant');
var getSingleRestaurant = require('./methods/getSingleRestaurant');
var deleteRestaurant = require('./methods/deleteRestaurant');

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
                let eventBody = JSON.parse(event.body)
                const newResponse = await postNewRestaurant(documentClient, eventBody);
                response.body = JSON.stringify(newResponse.body);
                response.statusCode = newResponse.statusCode;
                return response;

            }

        }

        if (event.pathParameters['restaurantId'] && !event.pathParameters['reviewId']) {
            if (event.httpMethod === 'GET') {
                const restaurantId = event.pathParameters['restaurantId'];
                const newResponse = await getSingleRestaurant(documentClient, restaurantId);
                response.body = JSON.stringify(newResponse);
                return response;
            }
            if (event.httpMethod === 'DELETE') {
                const restaurantId = event.pathParameters['restaurantId'];
                await deleteRestaurant(documentClient, restaurantId);
                response.body = null;
                return response;

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