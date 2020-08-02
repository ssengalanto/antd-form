import React from 'react';
import faker from 'faker';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestId } from 'tests';
import { formData } from 'form/mocks';

import { FormSelect } from './form-select.component';

type Props = React.ComponentProps<typeof FormSelect>;

const mockedProps: Props = {
  label: '',
  data: formData,
  description: '',
  fields: {
    selected: formData.map((item) => item.id),
    data: {},
    notes: '',
  },
  actions: {
    handleSelectAll: jest.fn(),
    handleSelection: jest.fn(),
  },
};

const setup = (props: Partial<Props> = {}): ShallowWrapper => {
  const setupProps = { ...mockedProps, ...props };
  return shallow(<FormSelect {...setupProps} />);
};

describe('<FormSelect /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should render the correct label', () => {
      const label = faker.random.words();
      const wrapper = setup({ label });
      const component = findByTestId(wrapper, 'form-select-component:label');

      expect(component.text()).toBe(label);
    });

    it('should render the description with the correct value', () => {
      const description = faker.random.words();
      const wrapper = setup({ description });
      const component = findByTestId(wrapper, 'form-select-component:description');

      expect(component.exists()).toBe(true);
      expect(component.contains(description)).toBe(true);
    });

    it('should render the correct count value', () => {
      const component = findByTestId(wrapper, 'form-select-component:count');

      expect(
        component.contains(`${mockedProps.fields.selected.length}/${mockedProps.data.length}`),
      ).toBe(true);
    });

    it('should render number of cards equal to data length', () => {
      const component = findByTestId(wrapper, 'form-select-component:cards');

      expect(component.length).toBe(mockedProps.data.length);
    });
  });

  describe('Interactions', () => {
    it('should call handleSelectAll when select all button is clicked', () => {
      const button = findByTestId(wrapper, 'form-select-component:button');
      button.simulate('click');

      expect(mockedProps.actions.handleSelectAll).toHaveBeenLastCalledWith(mockedProps.data);
    });
  });
});
