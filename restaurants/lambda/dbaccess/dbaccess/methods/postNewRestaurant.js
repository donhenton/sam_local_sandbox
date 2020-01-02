/**
 * Post a new restaurant to the restaurants table
 * Return {body: stuff, statusCode: 200}
 * @param: client the docclient
 * @param: newRestaurant JSON object for new restaurant
 * 
 */
const uuidv4 = require('uuid/v4');

postNewRestaurant = async function(client, newRestaurant) {
    if (typeof newRestaurant === 'string') {
        newRestaurant = JSON.parse(newRestaurant);
    }
    const uuidId = uuidv4();
    const returnValue = { body: { id: uuidId }, statusCode: 200 };
    newRestaurant['id'] = uuidId;
    const putItem = { TableName: "Restaurants", Item: newRestaurant };

    return new Promise(function(resolve, reject) {
        client.put(putItem, function(err, data) {
            if (err) reject(err); // an error occurred
            else resolve(returnValue); // successful response
        });

    });


}

/*

    { 
"name": "smurfazoid",
"zipCode": "44444",
"city":"frump",
"state":"WI",
"version":4}

    return 
    {id: 'ffdkjfdkjfkdjfkdj' }
     status 201 if successful

    */


module.exports = postNewRestaurant;

//http://donhenton-springmvc3.herokuapp.com/app/swagger/sdoc