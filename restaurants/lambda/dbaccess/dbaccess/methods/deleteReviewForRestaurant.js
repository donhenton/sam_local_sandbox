var getReviewsForRestaurant = require('./getReviewsForRestaurant');

/**
 * delete a review for a restaurant  
 * returns 200 on success 
 * empty body
 * 
 */
deleteReview = async function(client, restaurantId, reviewId) {


    var runIt = async function(resolve, reject) {



        try {

            var params = { TableName: "Reviews", Key: { id: reviewId, restaurantId: restaurantId } }
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


module.exports = deleteReview;