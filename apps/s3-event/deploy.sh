aws cloudformation deploy \
--template-file ./packaged.yaml \
--stack-name s3-events \
--capabilities CAPABILITY_NAMED_IAM \
--parameter-overrides  BucketName=com.awsdhenton.s3.event.override.testbucket \
--profile testuser \
