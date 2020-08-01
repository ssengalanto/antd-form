import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { App } from 'app';

const setup = (): ShallowWrapper => shallow(<App />);

describe('<App /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});
