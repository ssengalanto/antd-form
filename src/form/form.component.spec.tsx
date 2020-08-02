import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestId } from 'tests';

import { formData } from './mocks';
import { AntdForm } from './form.component';

type Props = React.ComponentProps<typeof AntdForm>;

const mockedProps: Props = {
  data: formData,
  form: {
    models: { fields: { data: {}, selected: [], notes: '' } },
    operations: {
      handleNotesOnChange: jest.fn(),
      handleQuestionOnChange: jest.fn(),
      handleSelectAll: jest.fn(),
      handleSelection: jest.fn(),
      handleSubmit: jest.fn(),
    },
  },
};

const setup = (props: Partial<Props> = {}): ShallowWrapper => {
  const setupProps = { ...mockedProps, ...props };
  return shallow(<AntdForm {...setupProps} />);
};

describe('<AntdForm /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should render <FormSelect />', () => {
      const component = findByTestId(wrapper, 'form-component:select');
      expect(component.exists()).toBe(true);
    });

    it('should render <FormList />', () => {
      const component = findByTestId(wrapper, 'form-component:list');
      expect(component.exists()).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('should call handleSubmit when submit button is clicked', () => {
      const button = findByTestId(wrapper, 'form-component:button');
      button.simulate('click');

      expect(mockedProps.form.operations.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
