import React from 'react';
import { Avatar, Col, Space, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { FormData } from 'form/mocks';
import { useReactFormType } from 'form/use-react-form.hook';

import { S } from './form-select.styles';

interface Props {
  data: FormData;
  selected: boolean;
  onChange: useReactFormType['operations']['handleSelection'];
}

export const FormSelectCard: React.FC<Props> = ({ data: { id, pet, src }, selected, onChange }) => (
  <S.Card selected={selected}>
    <Checkbox onChange={() => onChange(id, selected)} checked={selected}>
      <Space>
        <Col>
          <Avatar size={40} icon={!src && <UserOutlined />} src={src} />
        </Col>
        <Col>
          <S.Title>{pet}</S.Title>
        </Col>
      </Space>
    </Checkbox>
  </S.Card>
);
