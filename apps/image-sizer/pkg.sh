sam build && sam package --template-file template.yaml \
 --output-template-file packaged.yaml \
 --s3-bucket sam.awsdhenton.com.bucket \
 --profile testuser