getReviewsForRestaurant = require('./getReviewsForRestaurant');

getAllRestaurants = async function(client) {


    return new Promise(function(resolve, reject) {
        const restaurantTable = {
            TableName: 'Restaurants'
        };
        const reviewTable = {
            TableName: 'Reviews'
        };

        client.scan(restaurantTable, function(err, restaurantData) {
            let counter = 0;
            if (err) {
                reject(err);
            } else {

                restaurantData.Items.forEach((i, idx) => {

                    getReviewsForRestaurant(client, i.id).then(reviewData => {

                        i['reviewDTOs'] = reviewData.Items;
                        counter++;
                        if (counter === restaurantData.Items.length) {
                            resolve(restaurantData.Items);
                        }
                    }).catch(err => {
                        throw new Error(err.message)
                    });


                })

            }
        });

    });



}


module.exports = getAllRestaurants;