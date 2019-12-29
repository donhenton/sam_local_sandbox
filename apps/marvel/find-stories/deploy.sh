aws cloudformation deploy --template-file \
./package.yaml \
--stack-name marvel-find-stories \
--profile cdktest \
--capabilities CAPABILITY_IAM