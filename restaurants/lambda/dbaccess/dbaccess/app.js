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
var deleteReviewForRestaurant = require('./methods/deleteReviewForRestaurant');
var putRestaurant = require('./methods/putRestaurant');
var postNewReview = require('./methods/postNewReview');
var putReviewForRestaurant = require('./methods/putReviewForRestaurant');

exports.lambdaHandler = async(event, context) => {

    const response = {
        'statusCode': 200,
        'body': null
    }

    try {

        if (!event.pathParameters) {

            if (event.httpMethod === 'GET') {
                // get all restaurants
                const restaurantData = await getAllRestaurants(documentClient);
                response.body = JSON.stringify(restaurantData);
                return response;

            } else {
                // create a new restaurant
                let eventBody = JSON.parse(event.body)
                const newResponse = await postNewRestaurant(documentClient, eventBody);
                response.body = JSON.stringify(newResponse.body);
                response.statusCode = newResponse.statusCode;
                return response;

            }

        }

        if (event.pathParameters['restaurantId'] && !event.pathParameters['reviewId']) {

            if (event.httpMethod === 'GET') {
                // get a restaurant for id
                const restaurantId = event.pathParameters['restaurantId'];
                const newResponse = await getSingleRestaurant(documentClient, restaurantId);
                if (newResponse.body) {
                    response.body = JSON.stringify(newResponse.body);
                } else {
                    response.body = null;
                }

                response.statusCode = newResponse.statusCode;
                return response;
            }
            if (event.httpMethod === 'DELETE') {
                // delete a restaurant
                const restaurantId = event.pathParameters['restaurantId'];
                const t = await deleteRestaurant(documentClient, restaurantId);
                response.body = t.body;
                response.statusCode = t.statusCode;
                return response;

            }
            if (event.httpMethod === 'PUT') {
                //update a restaurant only
                const restaurantId = event.pathParameters['restaurantId'];
                const updates = JSON.parse(event.body);
                const currentRestaurant = await getSingleRestaurant(documentClient, restaurantId);
                if (currentRestaurant.statusCode === 404) {
                    response.body = null;
                    response.statusCode = 404;
                    return response;
                }

                const t = await putRestaurant(documentClient, updates, currentRestaurant.body);
                response.body = JSON.stringify(t);
                response.statusCode = 200;
                return response;
            }
            if (event.httpMethod === 'POST') {
                console.log("2")
                    //add a review for a restaurant known restaurant
                const restaurantId = event.pathParameters['restaurantId'];
                const newReview = JSON.parse(event.body)
                const t = await postNewReview(documentClient, newReview, restaurantId);
                response.body = t.body;
                response.statusCode = t.statusCode;
                return response;

            }

        }

        if (event.pathParameters['restaurantId'] && event.pathParameters['reviewId']) {

            if (event.httpMethod === 'DELETE') {

                const reviewId = event.pathParameters['reviewId'];
                const restaurantId = event.pathParameters['restaurantId'];
                const ret = await deleteReviewForRestaurant(documentClient, restaurantId, reviewId);
                if (ret.body) {
                    response.body = JSON.stringify(ret.body);
                } else {
                    response.body = null;
                }

                response.statusCode = ret.statusCode;
                return response;
            }
            if (event.httpMethod === 'PUT') {

                const reviewId = event.pathParameters['reviewId'];
                const restaurantId = event.pathParameters['restaurantId'];
                const newReview = JSON.parse(event.body)
                const ret = await putReviewForRestaurant(documentClient, restaurantId, reviewId, newReview);
                if (ret.body) {
                    response.body = JSON.stringify(ret.body);
                } else {
                    response.body = null;
                }

                response.statusCode = ret.statusCode;
                return response;
            }


            return response;
        }


    } catch (err) {
        // reject(err) in the promise code comes here
        response.statusCode = err.statusCode;
        if (!response.statusCode) {
            response.statusCode = 500;
        }
        response.body = err.message;

    }

    return response;
}