getReviewsForRestaurant = async function(client, id) {

    const rParm = {
            TableName: 'Reviews',
            IndexName: 'RestaurantReviews',
            KeyConditionExpression: 'restaurantId = :r_id',
            ExpressionAttributeValues: { ':r_id': id }
        }
        // console.log("############## " + id)

    return new Promise(function(resolve, reject) {
        // console.log("##############2 " + id)
        client.query(rParm, function(err, data) {
            // console.log("review data " + data)
            if (err) reject(err); // an error occurred

            else resolve(data); // successful response
        });

    });
}


module.exports = getReviewsForRestaurant;