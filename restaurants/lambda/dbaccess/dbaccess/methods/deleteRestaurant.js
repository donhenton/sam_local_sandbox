var getSingleRestaurant = require('./getSingleRestaurant');
var deleteReviewForRestaurant = require('./deleteReviewForRestaurant');

/**
 * delete a restaurant and associated reviews
 * returns 200 on success 
 * empty body
 * 
 */
deleteRestaurant = async function(client, restaurantId) {

    var success = { statusCode: 200, body: null };
    var notFound = { statusCode: 404, body: null };
    var runIt = async function(resolve, reject) {

        var foundRestaurant;

        try {
            foundRestaurant = await getSingleRestaurant(client, restaurantId);

            // console.log("found " + foundRestaurant.id)
            if (foundRestaurant) {
                foundRestaurant.reviewDTOs.forEach(rev => {

                    //TODO delete the reviews
                    deleteReviewForRestaurant(client, restaurantId, rev.id).then((d) => {
                        // console.log(d + "xxxxx")
                    });

                });

                var params = {
                    TableName: "Restaurants",
                    Key: {
                        id: restaurantId
                    }
                }
                client.delete(params, (err, data) => {

                    if (err) reject(err); // an error occurred
                    else resolve(success); // successful response

                })

            } else {
                console.log(`restaurant ${restaurantId}  not found`);
                resolve(notFound)
            }

        } catch (ee) {
            reject(ee);
        }

    }

    return new Promise(function(resolve, reject) {

        runIt(resolve, reject);

    });
}


module.exports = deleteRestaurant;