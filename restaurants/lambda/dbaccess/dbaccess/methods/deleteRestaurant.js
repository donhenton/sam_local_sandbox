var getSingleRestaurant = require('./getSingleRestaurant');
var deleteReviewForRestaurant = require('./deleteReviewForRestaurant');

/**
 * delete a restaurant and associated reviews
 * returns 200 on success 
 * empty body
 * 
 */
deleteRestaurant = async function(client, restaurantId) {


    var runIt = async function(resolve, reject) {

        var foundRestaurant;

        try {
            foundRestaurant = await getSingleRestaurant(client, restaurantId);
            // console.log("found " + foundRestaurant.id)
            foundRestaurant.reviewDTOs.forEach(rev => {

                //TODO delete the reviews
                //  await deleteReviewForRestaurant(restaurantId, rev.id);

            });
            var params = { TableName: "Restaurants", Key: { id: id } }
            client.delete(params, (err, data) => {

                if (err) reject(err); // an error occurred
                else resolve(null); // successful response

            })



        } catch (ee) {
            reject(ee)
        }

    }

    return new Promise(function(resolve, reject) {

        runIt(resolve, reject);

    });
}


module.exports = deleteRestaurant;