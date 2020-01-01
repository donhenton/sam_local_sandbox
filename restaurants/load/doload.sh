## this processes the batch files and loads them into dynamodb

aws dynamodb batch-write-item --request-items file://out/RestaurantsLoad_1.json --profile cdktest
aws dynamodb batch-write-item --request-items file://out/RestaurantsLoad_2.json --profile cdktest
aws dynamodb batch-write-item --request-items file://out/ReviewsLoad_1.json --profile cdktest
aws dynamodb batch-write-item --request-items file://out/ReviewsLoad_2.json --profile cdktest
aws dynamodb batch-write-item --request-items file://out/ReviewsLoad_3.json --profile cdktest
aws dynamodb batch-write-item --request-items file://out/ReviewsLoad_4.json --profile cdktest