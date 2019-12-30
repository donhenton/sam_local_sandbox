let response;
const getSecret = require('./getSecret');
const api = require('marvel-api');


function simplifyStoryData(data) {

    var storyData = [];
    var storiesInArray = data.data;
    storiesInArray.forEach(function(story) {
        var desc = null;
        if (story.description && story.description.length > 0) {
            desc = story.description;
        }

        var newItem = {
            title: story.title,
            id: story.id,
            description: desc,
            creators: [],
            comics: []
        };

        story.creators.items.forEach(function(c) {
            newItem.creators.push({
                name: c.name,
                role: c.role
            })
        })
        story.comics.items.forEach(function(c) {
            newItem.comics.push({
                name: c.name
            })
        })

        storyData.push(newItem);

    })

    return storyData;

}



asyncFindStoriesForCharacter = async function(characterId, marvelClient) {
    async function runMarvelStoriesCall() {
        try {
            var data = await marvelClient.characters.stories(characterId, 15, 0);

            return {
                count: data.meta.count,
                data: simplifyStoryData(data)
            };
        } catch (err) {
            logger.error('find stories problem ', err);

        }
    }
    var data = await runMarvelStoriesCall();
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
            const data = await asyncFindStoriesForCharacter(characterId, marvelClient);
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