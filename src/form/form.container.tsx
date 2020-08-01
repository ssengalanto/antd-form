import React from 'react';

import { formData } from './mocks';
import { AntdForm } from './form.component';
import { useReactForm } from './use-react-form.hook';

export const Form: React.FC = () => {
  const form = useReactForm();
  return <AntdForm form={form} data={formData} />;
};
