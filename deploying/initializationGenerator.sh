#!/bin/bash
if [ -d node_modules/yo ] 
then
yo create-feature
else 
npm install yo;
cd deploying/generators/create-feature;
sudo npm link;
npm install;
cd ../../..;
yo create-feature
fi
