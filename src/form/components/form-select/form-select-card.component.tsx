import React from 'react';
import { Avatar, Col, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { FormData } from 'form/mocks';
import { UseForm } from 'form/use-form.hook';

import { S } from './form-select.styles';

interface Props {
  data: FormData;
  selected: boolean;
  onClick: UseForm['operations']['handleSelection'];
}

export const FormSelectCard: React.FC<Props> = ({ data: { id, pet, src }, selected, onClick }) => (
  <S.Card selected={selected} onClick={() => onClick(id, selected)}>
    {selected && (
      <S.Absolute>
        <S.SelectedIcon twoToneColor="#52c41a" />
      </S.Absolute>
    )}
    <Space>
      <Col>
        <Avatar size={40} icon={!src && <UserOutlined />} src={src} />
      </Col>
      <Col>
        <S.Title>{pet}</S.Title>
      </Col>
    </Space>
  </S.Card>
);
