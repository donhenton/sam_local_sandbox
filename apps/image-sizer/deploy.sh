aws cloudformation deploy \
--template-file ~/awscdk/sam_local_sandbox/apps/image-sizer/packaged.yaml \
--stack-name image-sizer \
--capabilities CAPABILITY_NAMED_IAM \
--profile testuser \
