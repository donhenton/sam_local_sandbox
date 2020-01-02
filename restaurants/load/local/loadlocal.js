/**
 * create tables locally restaurant and reviews
 * paste into the shell at localhost:8080/shell
 */

var paramsRestaurant = {


    "KeySchema": [{
        "KeyType": "HASH",
        "AttributeName": "id"
    }],
    "TableName": "Restaurants",
    "AttributeDefinitions": [{
        "AttributeName": "id",
        "AttributeType": "S"
    }],
    "ProvisionedThroughput": {
        "WriteCapacityUnits": 1,
        "ReadCapacityUnits": 1
    }


}

var paramsReview = {

    "GlobalSecondaryIndexes": [{
        "KeySchema": [{
                "KeyType": "HASH",
                "AttributeName": "restaurantId"
            },
            {
                "KeyType": "RANGE",
                "AttributeName": "id"
            }
        ],
        "IndexName": "RestaurantReviews",
        "Projection": {
            "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
            "WriteCapacityUnits": 1,
            "ReadCapacityUnits": 1
        }
    }],
    "AttributeDefinitions": [{
            "AttributeName": "restaurantId",
            "AttributeType": "S"
        },
        {
            "AttributeName": "id",
            "AttributeType": "S"
        }
    ],
    "ProvisionedThroughput": {
        "WriteCapacityUnits": 1,
        "ReadCapacityUnits": 1
    },
    "TableName": "Reviews",
    "KeySchema": [{
            "KeyType": "HASH",
            "AttributeName": "id"
        },
        {
            "KeyType": "RANGE",
            "AttributeName": "restaurantId"
        }
    ]





}
var dd = new AWS.DynamoDB({
    region: 'us-east-1',
    endpoint: "http://localhost:8000"
});

dd.createTable(paramsRestaurant, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response

});

dd.createTable(paramsReview, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response

});


/*


var params = {
    TableName: 'Restaurants',
};

var dd = new AWS.DynamoDB({
    region: 'us-east-1',
    endpoint: "http://localhost:8000"
});
dd.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});



*/