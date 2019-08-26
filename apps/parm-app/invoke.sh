
#ff=$1
#ff="aenv.json"
#sam local invoke ParmAppFunction --event event.json --env-vars ${ff}
sam local invoke ParmAppFunction --event event.json --env-vars aenv.json