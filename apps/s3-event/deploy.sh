aws cloudformation deploy \
--template-file ./packaged.yaml \
--stack-name s3-events \
--capabilities CAPABILITY_NAMED_IAM \
--profile testuser \
