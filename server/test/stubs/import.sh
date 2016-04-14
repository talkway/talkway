#! /bin/sh

# Get the location of this script
THERE=$(pwd)
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"

# Change into this directory
cd "$(dirname $HERE)"

for file in *.json
do
	NAME=${file%.*}

	mongoimport $file -c $NAME

	mongo --eval "db.$NAME.createIndex({ location: '2dsphere' })"
done

cd $THERE
