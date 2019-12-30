let response;
const AWS = require('aws-sdk');
const getSecret = require('./getSecret');
const api = require('marvel-api');
const count = 12;

function simplifyCharacterData(data, portraitSize) {
    var returnedData = [];
    data.data.forEach(function(d) {
        var imgData = null;
        if (d.thumbnail && d.thumbnail.path && d.thumbnail.extension) {
            imgData = (d.thumbnail.path + "/" + portraitSize + "." + d.thumbnail.extension)
        }
        var p = {
            "name": d.name,
            'imageUrl': imgData,
            id: d.id,
            urls: d.urls
        }
        returnedData.push(p);
    });

    return returnedData;

}

asyncFindAllCharacters = async function(offset, marvelClient) {

    var foundData = null;
    async function runMarvel() {
        try {
            return marvelClient.characters.findAll(count, offset)
        } catch (err) {
            console.error('find all character problem', err);

        }

    }
    var data = await runMarvel();
    foundData = {
        data: simplifyCharacterData(data, 'portrait_medium'),
        offset: offset,
        count: count,
        total: data.meta.total
    };

    return foundData;

}

response = {
    'statusCode': 200,
    "headers": {
        "Content-Type": "application/json",
        "access-control-allow-headers": "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "access-control-allow-methods": "GET",
        "access-control-allow-origin": "*"
    },
    'body': ''
}
exports.lambdaHandler = async(event, context) => {
    let secretName = "marvel/accessKeys";
    let offset;
    if (event.queryStringParameters) {
        if (event.queryStringParameters.offset) {
            offset = parseInt(event.queryStringParameters.offset);
        }
        if (!offset) {
            offset = 0;
        }
    }
    try {

        const secretString = await getSecret(secretName);
        const config = JSON.parse(secretString);
        const marvelClient = api.createClient(config);
        const data = await asyncFindAllCharacters(offset, marvelClient);
        response.body = JSON.stringify(data);


    } catch (err) {

        const e = {
            "ERROR": err
        };
        console.log(err);
        response.statusCode = 500;
        response.body = JSON.stringify(e);
    }

    return response;
};