import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestId } from 'tests';
import { formData } from 'form/mocks';

import { FormSelectCard } from './form-select-card.component';

type Props = React.ComponentProps<typeof FormSelectCard>;

const mockedProps: Props = {
  data: formData[0],
  selected: false,
  onChange: jest.fn(),
};

const setup = (props: Partial<Props> = {}): ShallowWrapper => {
  const setupProps = { ...mockedProps, ...props };
  return shallow(<FormSelectCard {...setupProps} />);
};

describe('<FormSelectCard /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('checkbox should have the correct state', () => {
      const checkbox = findByTestId(wrapper, 'form-select-card-component:checkbox');
      expect(checkbox.prop('checked')).toBe(mockedProps.selected);
    });

    it('should render the correct image', () => {
      const avatar = findByTestId(wrapper, 'form-select-card-component:avatar');
      expect(avatar.prop('src')).toBe(mockedProps.data.src);
    });

    it('should render the correct pet title', () => {
      const title = findByTestId(wrapper, 'form-select-card-component:title');
      expect(title.text()).toBe(mockedProps.data.pet);
    });
  });

  describe('Interactions', () => {
    it('should call onChange prop when performing onChange in checkbox', () => {
      const checkbox = findByTestId(wrapper, 'form-select-card-component:checkbox');
      checkbox.simulate('change');

      expect(mockedProps.onChange).toHaveBeenCalledWith(mockedProps.data.id, mockedProps.selected);
    });
  });
});
