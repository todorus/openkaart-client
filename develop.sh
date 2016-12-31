# get the local directory to convert relative paths to absolute ones
LOCAL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# get the config File
cp $LOCAL_DIR/docker/staging/config.ts $LOCAL_DIR/client/app/config.ts  

# make sure we use the latest build
docker-compose -f $LOCAL_DIR/docker/staging/develop.yaml build

# run the development container
docker-compose -f $LOCAL_DIR/docker/staging/develop.yaml up
