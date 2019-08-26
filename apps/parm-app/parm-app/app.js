// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
let aws = require('aws-sdk');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
 
exports.lambdaHandler = async (event, context) => {
    try {
   
        let foundValue = "N/A";
        let group;
        let ssmData = "N/A";
        if (event.queryStringParameters) {
          group = event.queryStringParameters.group;
        }
        
        let pathstuff;
        if (event.pathParameters) {
            
        }
        if (aws) {
            let ssm = new aws.SSM();
            var params = {
            Name: '/dev/db/password', 
            WithDecryption: false
            };
            
             const getSSMKey = async params => {
               const {Parameter: {Value: APIKey}} = await ssm.getParameter(params).promise();
               return APIKey;
             };
             
             
             ssmData = await getSSMKey(params);
 
              
        }
        
        
           
        if (group) {
            group = group.toUpperCase().trim();
            let t = process.env[group]
            if (t) {
                foundValue = t;
            }

        } 
        response = {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json" 
            },
            'body': JSON.stringify({
                'result': foundValue ,
                'path': event.pathParameters,
                'ssmData': ssmData
                 
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};