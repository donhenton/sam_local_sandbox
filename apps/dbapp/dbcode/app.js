// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const connString = process.env.CONNECTION_STRING  ? process.env.CONNECTION_STRING : '';
const officeDao = require('./OfficesDao')(connString);


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

/*
        response = {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json" 
            },
            'body': JSON.stringify({
                env: 'xx'+envVar +'xx' 
            })
        }
*/

        // const ret = await axios(url);
       
       const resdata = await officeDao.getOffices();
       resdata.forEach(d => {
            const keys = Object.keys(d);
            keys.forEach(k => {
                if (d[k])
                   d[k] =  d[k].trim();
            })

       })
       
        response = {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json" 
            },
            'body': JSON.stringify({
                
                data: resdata 
            })
        }
         
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
