import { use, config } from 'chai';
import { matchSnapshot } from "chai-karma-snapshot";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

use(matchSnapshot);

Enzyme.configure({ adapter: new Adapter() });

config.truncateThreshold = 0;

var testContext = require.context('./src', true, /-tests?\.tsx?/);
testContext.keys().forEach(testContext);

// var coverageContext = require.context('./src', true, /^(?!.*(?:-tests?|index\.tsx?$|loader\.ts$)).*\.tsx?$/);
// coverageContext.keys().forEach(coverageContext);