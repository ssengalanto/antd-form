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
    <>
      <Form layout="vertical" name="basic" onFinish={handleSubmit}>
        <FormSelect
          label="Select Pets"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          data={data}
          fields={fields}
          actions={{ handleSelection, handleSelectAll }}
        />

        <FormList
          data={data}
          fields={fields}
          actions={{ handleNotesOnChange, handleQuestionOnChange }}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
