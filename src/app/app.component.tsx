import React from 'react';

import { Form } from 'form';

import { S } from './app.styles';

export const App: React.FC = () => (
  <S.Layout>
    <div style={{ width: '50%' }}>
      <Form />
    </div>
  </S.Layout>
);
