import enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: false,
});
