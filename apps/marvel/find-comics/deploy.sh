aws cloudformation deploy --template-file \
./package.yaml \
--stack-name marvel-find-comics \
--profile cdktest \
--capabilities CAPABILITY_IAM