#sam local invoke DbAccessFunction --event ./events/getAllRestaurants.json  --profile=cdktest
#sam local invoke DbAccessFunction --event ./events/postNewRestaurant.json  --profile=cdktest
#sam local invoke DbAccessFunction --event ./events/getSingleRestaurant.json  --profile=cdktest
sam local invoke DbAccessFunction --event ./events/deleteRestaurant.json  --profile=cdktest
#sam local invoke DbAccessFunction --event ./events/deleteReviewForRestaurant.json  --profile=cdktest