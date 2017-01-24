import { config } from 'chai';

config.truncateThreshold = 0;

var testContext = require.context('./src', true, /-tests?\.tsx?/);
testContext.keys().forEach(testContext);

var coverageContext = require.context('./src', true, /^(?!.*(?:-tests?|index\.tsx?$)).*\.tsx?$/);
coverageContext.keys().forEach(coverageContext);