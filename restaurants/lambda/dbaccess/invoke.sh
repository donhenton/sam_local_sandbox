#sam local invoke DbAccessFunction --event ./events/getAllRestaurants.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/postNewRestaurant.json  --profile=cdktest --env-vars events/envars.json
sam local invoke DbAccessFunction --event ./events/getSingleRestaurant.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/deleteRestaurant.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/deleteReviewForRestaurant.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/putRestaurant.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/postNewReview.json  --profile=cdktest --env-vars events/envars.json
#sam local invoke DbAccessFunction --event ./events/putReviewForRestaurant.json  --profile=cdktest --env-vars events/envars.json
