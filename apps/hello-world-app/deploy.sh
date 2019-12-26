aws cloudformation deploy --template-file \
./packaged.yaml \
--stack-name hello-world-sam-1 \
--profile cdktest \
--capabilities CAPABILITY_IAM