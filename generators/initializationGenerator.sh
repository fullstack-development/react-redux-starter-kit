#!/bin/bash
if [ -d generators/node_modules ] 
then
yo create-feature
else
cd generators;
npm install;
sudo npm link;
cd ../;
yo create-feature
fi
