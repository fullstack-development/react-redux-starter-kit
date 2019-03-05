import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'reflect-metadata';

Enzyme.configure({ adapter: new (Adapter as any)() });
