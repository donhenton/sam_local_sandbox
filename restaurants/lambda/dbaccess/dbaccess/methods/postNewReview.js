/**
 * Post a new restaurant to the restaurants table, optionally Post reviews 
 * Return {body: stuff, statusCode: 200}
 * @param: client the docclient
 * @param: newRestaurant JSON object for new restaurant
 * 
 */
const uuidv4 = require('uuid/v4');
const getSingleRestaurant = require('./getSingleRestaurant');
const returnValue = {
    statusCode: 200,
    body: null
};

postNewReview = async function(client, newReview, restaurantId) {
    if (typeof newReview === 'string') {
        newRestaurant = JSON.parse(newRestaurant);
    }
    const uuidId = uuidv4();
    const checkRestaurant = await getSingleRestaurant(client, restaurantId);
    if (checkRestaurant.statusCode === 404) {
        returnValue.statusCode = 404;
        returnValue.body = { error: `restaurant[${restaurantId}] not found` }
        return Promise.resolve(returnValue);
    }
    returnValue.body = { id: uuidId };
    newReview['id'] = uuidId;
    newReview['restaurantId'] = restaurantId;
    const putItem = { TableName: "Reviews", Item: newReview };




    return new Promise(function(resolve, reject) {
        client.put(putItem, function(err, data) {

            if (err) reject(err); // an error occurred
            else resolve(returnValue); // successful response
        });

    });
};



module.exports = postNewReview;