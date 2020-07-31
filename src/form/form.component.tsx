import React from 'react';
import { Form, Button } from 'antd';

import { FormData } from './mocks';
import { UseForm } from './use-form.hook';
import { FormList, FormSelect } from './components';

interface Props {
  form: UseForm;
  data: FormData[];
}

export const AntdForm: React.FC<Props> = ({ data, form }) => {
  const {
    models: { fields },
    operations: {
      handleError,
      handleSubmit,
      handleSelectAll,
      handleSelection,
      handlePetQuestionOnChange,
      handleAdditionalNotesOnChange,
    },
  } = form;

  return (
    <>
      <Form layout="vertical" name="basic" onFinish={handleSubmit} onFinishFailed={handleError}>
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
          actions={{ handleAdditionalNotesOnChange, handlePetQuestionOnChange }}
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
