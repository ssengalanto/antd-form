import React from 'react';

import { formData } from './mocks';
import { useForm } from './use-form.hook';
import { AntdForm } from './form.component';

export const Form: React.FC = () => {
  const form = useForm();
  return <AntdForm form={form} data={formData} />;
};
