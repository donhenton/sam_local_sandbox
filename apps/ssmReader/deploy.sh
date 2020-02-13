aws cloudformation deploy \
--template-file ~/awscdk/sam_local_sandbox/apps/ssmReader/packaged.yaml \
--stack-name ssmReader \
--profile testuser \
--capabilities CAPABILITY_IAM