import React from 'react';
import { Form, Button, Select } from 'antd';

import { FormData } from './mocks';
import { FormList } from './components';
import { useForm } from './use-form.hook';

interface Props {
  form: ReturnType<typeof useForm>;
  data: FormData[];
}

export const AntdForm: React.FC<Props> = ({ data, form }) => {
  const {
    models: { fields },
    operations: {
      handleError,
      handleSubmit,
      handlePetSelection,
      handlePetQuestionOnChange,
      handleAdditionalNotesOnChange,
    },
  } = form;

  return (
    <>
      <Form layout="vertical" name="basic" onFinish={handleSubmit} onFinishFailed={handleError}>
        <Form.Item label="Select Pet">
          <Select mode="multiple" placeholder="Please select" onChange={handlePetSelection}>
            {data.map(({ id, pet }) => (
              <Select.Option key={id} value={id}>
                {pet}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

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
