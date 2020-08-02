import React from 'react';
import faker from 'faker';
import { shallow, ShallowWrapper } from 'enzyme';

import { formData } from 'form/mocks';
import { MockComponent, findByTestId } from 'tests';

import { FormList } from './form-list.component';

type Props = React.ComponentProps<typeof FormList>;

const mockedProps: Props = {
  fields: {
    selected: [],
    data: {},
    notes: '',
  },
  actions: {
    handleNotesOnChange: jest.fn(),
    handleQuestionOnChange: jest.fn(),
  },
  data: formData,
};

const setup = (props: Partial<Props> = {}): ShallowWrapper => {
  const setupProps = { ...mockedProps, ...props };
  return shallow(
    <FormList {...setupProps}>
      <MockComponent />
    </FormList>,
  );
};

describe('<FormList /> Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Renders', () => {
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should not render inputs when selected is empty', () => {
      const input = findByTestId(wrapper, 'form-list-component:input');
      expect(input.length).toBe(0);

      const textArea = findByTestId(wrapper, 'form-list-component:text-area');
      expect(textArea.length).toBe(0);
    });

    it('should render inputs base on selected items', () => {
      const wrapper = setup({
        fields: { ...mockedProps.fields, selected: [mockedProps.data[0].id] },
      });

      const input = findByTestId(wrapper, 'form-list-component:input');
      expect(input.length).toBe(mockedProps.data[0].questions.length);

      const textArea = findByTestId(wrapper, 'form-list-component:text-area');
      expect(textArea.length).toBe(1);
    });
  });

  describe('Interactions', () => {
    it('should call handleQuestionOnChange when performing onChange action in input', () => {
      const index = 0;
      const value = faker.random.words();
      const target = {
        target: { value },
      };
      const wrapper = setup({
        fields: { ...mockedProps.fields, selected: [mockedProps.data[index].id] },
      });
      const input = findByTestId(wrapper, 'form-list-component:input').at(index);
      input.simulate('change', target);

      expect(mockedProps.actions.handleQuestionOnChange).toHaveBeenCalledWith({
        value,
        petId: mockedProps.data[index].id,
        questionId: mockedProps.data[index].questions[index].id,
      });
    });

    it('should call handleNotesOnChange when performing onChange action in text-area', () => {
      const value = faker.random.words();
      const target = {
        target: { value },
      };
      const wrapper = setup({
        fields: { ...mockedProps.fields, selected: [mockedProps.data[0].id] },
      });
      const textArea = findByTestId(wrapper, 'form-list-component:text-area');
      textArea.simulate('change', target);

      expect(mockedProps.actions.handleNotesOnChange).toHaveBeenCalledWith(value);
    });
  });
});
