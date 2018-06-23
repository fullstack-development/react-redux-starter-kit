#!/bin/bash
if [ -d generators/node_modules ] 
then
node_modules/.bin/ts-node --project generators/tsconfig.json node_modules/.bin/yo create-feature
else
cd generators;
npm install;
sudo npm link;
cd ../;
node_modules/.bin/ts-node --project generators/tsconfig.json node_modules/.bin/yo create-feature
fi
