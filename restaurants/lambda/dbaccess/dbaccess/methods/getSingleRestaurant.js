getReviewsForRestaurant = require('./getReviewsForRestaurant');
getSingleRestaurant = async function(client, restaurantId) {


    return new Promise(function(resolve, reject) {

        const restaurantTable = {
            TableName: 'Restaurants'
        };
        const reviewTable = {
            TableName: 'Reviews'
        };

        const restaurantParm = {
            TableName: 'Restaurants',
            KeyConditionExpression: 'id = :r_id',
            ExpressionAttributeValues: { ':r_id': restaurantId }
        }

        client.query(restaurantParm, function(err, data) {
            const restaurant = data.Items[0];
            // console.log("1")
            if (!restaurant) {
                resolve(null);
                return;
            }
            restaurant['reviewDTOs'] = [];
            if (err) {
                reject(err); // an error occurred
                return;
            }
            // console.log("2 " + restaurant.id + " " + (typeof getReviewsForRestaurant))
            getReviewsForRestaurant(client, restaurant.id).then(reviewData => {
                //   console.log("3")
                if (reviewData && reviewData.Items) {
                    // console.log("in reviews")
                    // console.log(reviewData.Items)
                    restaurant['reviewDTOs'] = reviewData.Items;
                }
                //    console.log("5 " + reviewData + " " + restaurant.reviewDTOs)
                resolve(restaurant);
            }).catch(err => {
                console.log("error")
                console.log(err)
                reject(err)
                throw new Error(err.message)
            });

        });


    });



}


module.exports = getSingleRestaurant;