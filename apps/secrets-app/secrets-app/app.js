let response;
let AWS = require('aws-sdk');

async function getSecret(secretName) {
    let region = "us-east-2";
    let secret;
    let decodedBinarySecret;
    var client = new AWS.SecretsManager({
        region: region
    });
    return new Promise(function(resolve, reject) {


        client.getSecretValue({
            SecretId: secretName
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                    resolve(secret);
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                    resolve(decodedBinarySecret);
                }
            }

        });
    });
}


exports.lambdaHandler = async(event, context) => {
    let secretName = "database/access";
    try {

        let secret = await getSecret(secretName);
        response = {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json"
            },
            'body': JSON.stringify({

                'path': event.pathParameters,
                'secret': secret

            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};