#!/bin/bash
echo '$PWD '$PWD
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
pm2 start $DIR/../index.js --name app

