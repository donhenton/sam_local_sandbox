aws cloudformation deploy --template-file \
./package.yaml \
--stack-name marvel-find-all-characters \
--profile cdktest \
--capabilities CAPABILITY_IAM