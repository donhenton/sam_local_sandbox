/**
 * delete a review for a restaurant  
 * returns {statusCode: 200/404, body: null} 404 if either restaurant or review not found
 * 
 */
deleteReview = async function(client, restaurantId, reviewId) {


    var runIt = async function(resolve, reject) {

        const returnValue = { statusCode: 200, body: null };

        try {

            var params = { TableName: "Reviews", Key: { id: reviewId, restaurantId: restaurantId } }
            client.delete(params, (err, data) => {

                if (err)
                    reject(err); // an error occurred
                else {
                    resolve(returnValue); // successful response
                }


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