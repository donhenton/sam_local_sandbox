var AWS = require('aws-sdk');
var ssmClient = new AWS.SSM();
const uuidv4 = require('uuid/v4');
var cfnResponse = require('cfn-response');

exports.lambdaHandler = async(event, context) => {

    var responseBody = { statusCode: 500, Value: 'request failed' }
    var responseStatus = 'SUCCESS';
    var physical_id = uuidv4();
    if (event['RequestType'] === 'Create' || event['RequestType'] === 'Update') {
        var withDecryption = true;
        var decryptRequest = event['ResourceProperties']['WithDecryption']
        if (decryptRequest && (decryptRequest + "" === 'false')) {
            withDecryption = false;
        }

        var parms = {
            Name: event['ResourceProperties']['ParameterName'],
            WithDecryption: withDecryption
        }
        try {
            const data = await ssmClient.getParameter(parms).promise();
            responseBody.statusCode = 200;
            responseBody.Value = data.Parameter.Value;
        } catch (err) {
            if (err.code === 'ParameterNotFound') {
                responseBody.statusCode = 404;
                responseBody.Value = err.code;
            } else {
                responseBody.Value = JSON.stringify(err)
            }

        }


    } else {
        responseBody.Value = `failed because RequestType not proper type`;

    }
    //   cfnResponse.send(event, context, responseStatus, responseData, physical_id)
    return responseBody;
};