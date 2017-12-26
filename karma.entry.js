import { config } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

config.truncateThreshold = 0;

var testContext = require.context('./src', true, /-tests?\.tsx?/);
testContext.keys().forEach(testContext);

// var coverageContext = require.context('./src', true, /^(?!.*(?:-tests?|index\.tsx?$|loader\.ts$)).*\.tsx?$/);
// coverageContext.keys().forEach(coverageContext);