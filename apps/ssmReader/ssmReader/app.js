var AWS = require('aws-sdk');
var ssmClient = new AWS.SSM();
const uuidv4 = require('uuid/v4');
var cfnResponse = require('cfn-response');

exports.lambdaHandler = async(event, context) => {

    var responseData = {}
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

            responseData['Value'] = data.Parameter.Value;
        } catch (err) {
            if (err.code === 'ParameterNotFound') {

                responseData.Value = err.code;
                responseStatus = 'FAILED'
            } else {
                responseData['Value'] = JSON.stringify(err)
            }

        }


    } else {
        responseData['Value'] = `failed because RequestType not proper type`;
        responseStatus = 'FAILED';
    }
    cfnResponse.send(event, context, responseStatus, responseData, physical_id)
    return responseData;
};