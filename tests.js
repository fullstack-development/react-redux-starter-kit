import { config } from 'chai';
config.truncateThreshold = 0;
var context = require.context('./src', true, /-tests?\.tsx?$/);
context.keys().forEach(context);