import React from 'react';
import { Avatar, Col, Space, Checkbox } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

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
    <Checkbox
      onChange={() => onChange(id, selected)}
      checked={selected}
      data-test-id="form-select-card-component:checkbox"
    >
      <Space>
        <Col>
          <Avatar
            size={40}
            icon={!src && <FileImageOutlined />}
            src={src}
            data-test-id="form-select-card-component:avatar"
          />
        </Col>
        <Col>
          <S.Title data-test-id="form-select-card-component:title">{pet}</S.Title>
        </Col>
      </Space>
    </Checkbox>
  </S.Card>
);
