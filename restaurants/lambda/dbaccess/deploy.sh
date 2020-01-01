aws cloudformation deploy --template-file \
./package.yaml \
--stack-name restaurant-dbaccess \
--profile cdktest \
--capabilities CAPABILITY_IAM