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
            console.log("1")
            restaurant['reviewDTOs'] = [];
            if (err) {
                reject(err); // an error occurred
                return;
            }
            console.log("2 " + restaurant.id + " " + (typeof getReviewsForRestaurant))
            getReviewsForRestaurant(client, restaurant.id).then(reviewData => {
                console.log("3")
                if (reviewData && reviewData.Items) {
                    console.log("4")
                    restaurant['reviewDTOs'] = reviewData.Items;
                }
                console.log("5 " + reviewData + " " + restaurant.reviewDTOs)
                resolve(restaurant);
            }).catch(err => {
                console.log("error")
                console.log(err)
                reject(err)
                throw new Error(err.message)
            });



        });




        /*

                client.scan(restaurantTable, function(err, restaurantData) {
                    let counter = 0;
                    if (err) {
                        reject(err);
                    } else {

                        restaurantData.Items.forEach((i, idx) => {
                            i['reviewDTOs'] = [];

                            getReviewsForRestaurant(client, i.id).then(reviewData => {

                                i['reviewDTOs'] = reviewData.Items;
                                counter++;
                                console.log(`i ${i} idx ${idx}`);
                                if (counter === restaurantData.Items.length) {
                                    resolve(restaurantData.Items);
                                }
                            }).catch(err => {
                                console.log("error")
                                console.log(err)
                                reject(err)
                                throw new Error(err.message)
                            });


                        })

                    }
                }); */

    });



}


module.exports = getSingleRestaurant;