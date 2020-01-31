var assert = require('assert');
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
//https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
exports.handler = function(event, context) {
    console.log("start");
    var codepipeline = new AWS.CodePipeline();
    var cloudFront = new AWS.CloudFront();
    //notify of a success
    var jobId = event["CodePipeline.job"].id;
    console.log(`jobId ${jobId}`)
    var putJobSuccess = function(message) {
        var params = {
            jobId: jobId
        };
        codepipeline.putJobSuccessResult(params, function(err, data) {
            if (err) {
                context.fail(err);
            } else {
                context.succeed(message);
            }
        });
    };

    // Notify AWS CodePipeline of a failed job
    var putJobFailure = function(message) {
        var params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        };
        codepipeline.putJobFailureResult(params, function(err, data) {
            context.fail(message);
        });
    };

    const uuidId = uuidv4();
    const distId = event["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters;
    console.log(`distId ${distId}`)
    const params = {
            DistributionId: distId,
            InvalidationBatch: {
                CallerReference: uuidId,
                Paths: {
                    Quantity: 1,
                    Items: ['/*']
                }
            }


        }
        //context.succeed('done')
    cloudFront.createInvalidation(params, function(err, data) {
        if (err) {
            putJobFailure('Error: ' + err.message);
        } else {
            putJobSuccess(`Invalidation succeeded for ${distId}`);
        }
    })


};