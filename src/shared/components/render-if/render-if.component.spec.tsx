import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { MockComponent, findByTestId } from 'tests';

import { RenderIf } from './render-if.component';

type Props = React.ComponentProps<typeof RenderIf>;

const mockedProps: Props = {
  condition: false,
};

const setup = (props: Partial<Props> = {}): ShallowWrapper => {
  const setupProps = { ...mockedProps, ...props };
  return shallow(
    <RenderIf {...setupProps}>
      <MockComponent data-test-id="mock-component" />
    </RenderIf>,
  );
};

describe('<RenderIf /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should not render children when condition props is false', () => {
      const component = findByTestId(wrapper, 'mock-component');
      expect(component.exists()).toBe(false);
    });

    it('should render children when condition props is true', () => {
      const wrapper = setup({ condition: true });
      const component = findByTestId(wrapper, 'mock-component');
      expect(component.exists()).toBe(true);
    });
  });
});
