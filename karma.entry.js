import { config } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

config.truncateThreshold = 0;

var testContext = require.context('./src', true, /-tests?\.tsx?/);
testContext.keys().forEach(testContext);

var coverageContext = require.context('./src', true, /^(?!.*(?:-tests?|index\.tsx?$)).*\.tsx?$/);
coverageContext.keys().forEach(coverageContext);