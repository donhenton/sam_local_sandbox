
# SAM LOCAL SANDBOX

## Using AWS SAM (Server Application Model)

This application collection is for exploring SAM local and AWS SAM

## VS Code Debug

<http://www.goingserverless.com/blog/debugging-nodejs-lamdbas-with-sam-local-and-vscode>

## Installation

* <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html>
* <https://alexharv074.github.io/2019/03/02/introduction-to-sam-part-i-using-the-sam-cli.html>
* <http://aws-cloud.guru/testing-lambdas-locally-with-aws-sam-cli/>

## Ref

* <https://github.com/awslabs/aws-sam-cli>
* <https://www.baeldung.com/aws-serverless>
* <https://stackoverflow.com/questions/54798633/how-to-connect-rds-instance-when-running-sam-locally>

## Event generation

<https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-generate-event.html>

```sam local generate-event s3```
This creates payloads that allow simulation of an invocation. The payload can be referenced with the --event flag (see below)

## Invocation

```sam local invoke DbFunction --event event.json --env-vars env.json```
the name of the function is stored in the template.yaml file that is generated during initialization (see below)

### Environment Variables

environment variables can be passed in for invoke using the --env-vars flag. They are in the following form:

```json
{
    "DbFunction": {
        "CONNECTION_STRING": "postgresql://user:password@<servername>:5432/jdatabase"

    }
}
```
Environment variables can be used to point the local invocations to a localhost database. Since the invocations occur in a docker instance
the 'servername' will have to be the fully qualified name to host, not *localhost*. Host IP will probably work as well. On AWS the environment
variable can be set in the lamdba console.

## Initialization of an application

```bash
sam init -r nodejs10.x -n dbapp  
```

## Packaging

See ```sam --help``, but basically your are packaging to an s3 bucket

```bash
sam package --template-file template.yaml --s3-bucket com.dhenton.sambucket --output-template-file packaged.yaml
```

Once in the bucket, you can point the AWS lambda web page to the bucket target to load into the editor

## SAM Local API

```sam local start-api``` and ```sam local start-lambda``` can be used to simulate API Gateway interactions with your lambda
