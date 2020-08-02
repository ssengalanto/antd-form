import React from 'react';
import { Form, Button } from 'antd';

import { FormData } from './mocks';
import { FormList, FormSelect } from './components';
import { useReactFormType } from './use-react-form.hook';

interface Props {
  form: useReactFormType;
  data: FormData[];
}

export const AntdForm: React.FC<Props> = ({ data, form }) => {
  const {
    models: { fields },
    operations: {
      handleSubmit,
      handleSelectAll,
      handleSelection,
      handleNotesOnChange,
      handleQuestionOnChange,
    },
  } = form;

  return (
    <Form layout="vertical" name="basic">
      <FormSelect
        label="Select Pets"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        data={data}
        fields={fields}
        actions={{ handleSelection, handleSelectAll }}
        data-test-id="form-component:select"
      />

      <FormList
        data={data}
        fields={fields}
        actions={{ handleNotesOnChange, handleQuestionOnChange }}
        data-test-id="form-component:list"
      />

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          data-test-id="form-component:button"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
