
#ff=$1
#ff="aenv.json"
#sam local invoke ParmAppFunction --event event.json --env-vars ${ff}
sam local invoke FindStoriesFunction --event event.json  --profile=cdktest