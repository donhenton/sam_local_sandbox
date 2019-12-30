let response;
const getSecret = require('./getSecret');
const api = require('marvel-api');


function simplifyComicData(data) {
    var returnedData = [];
    data.data.forEach(function(d) {

        var imgData = null;
        if (d.thumbnail && d.thumbnail.path && d.thumbnail.extension) {
            imgData = (d.thumbnail.path + "/portrait_xlarge." + d.thumbnail.extension)
        }
        var p = {
            "title": d.title,
            price: d.prices[0],
            'description': d.description,
            'date': d.dates[0].date,
            'thumbnail': imgData,
            id: d.id
        }
        returnedData.push(p);
    });

    return returnedData;
}


const asyncFindComicsForCharacter = async function(characterId, marvelClient) {
    async function runMarvelComicsCall() {
        try {
            var data = await marvelClient.characters.comics(characterId);
            return {
                count: data.meta.count,
                data: simplifyComicData(data)
            };

        } catch (err) {
            console.error('find comic problem ', err);

        }
    }
    var data = await runMarvelComicsCall();
    return data;
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

    try {
        let characterId = null;
        if (event.pathParameters && event.pathParameters.characterId) {
            characterId = event.pathParameters.characterId;

            const secretString = await getSecret(secretName);
            const config = JSON.parse(secretString);
            const marvelClient = api.createClient(config);
            const data = await asyncFindComicsForCharacter(characterId, marvelClient);
            response.body = JSON.stringify(data);
        } else {
            const e2 = {
                "ERROR": "not able to find characterId Path Param"
            };
            response.statusCode = 500;
            response.body = JSON.stringify(e2);
        }

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