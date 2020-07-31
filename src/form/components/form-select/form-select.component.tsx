import React, { useCallback } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';

import { FormData } from 'form/mocks';
import { UseForm } from 'form/use-form.hook';

import { S } from './form-select.styles';
import { FormSelectCard } from './form-select-card.component';

const { Text } = Typography;

interface Props {
  label: string;
  data: FormData[];
  description?: string;
  fields: UseForm['models']['fields'];
  actions: Pick<UseForm['operations'], 'handleSelection' | 'handleSelectAll'>;
}

export const FormSelect: React.FC<Props> = ({ label, description, data, fields, actions }) => {
  const totalCount = data.length;
  const selectedCount = fields.selected.length;

  const isSelected = useCallback((id: string) => fields.selected.includes(id), [fields.selected]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Row>
            <Space>
              <S.Label>{label}</S.Label>
              <Text>{`${selectedCount}/${totalCount}`}</Text>
            </Space>
          </Row>
          {description && <Text>{description}</Text>}
        </Col>
        <Col>
          <Button onClick={() => actions.handleSelectAll(data)}>
            {totalCount === selectedCount ? 'Deselect All' : 'Select All'}
          </Button>
        </Col>
      </Row>
      <S.CardContainer>
        <Row gutter={16}>
          <Space>
            {data.map((item) => (
              <Col>
                <FormSelectCard
                  key={item.id}
                  data={item}
                  selected={isSelected(item.id)}
                  onClick={actions.handleSelection}
                />
              </Col>
            ))}
          </Space>
        </Row>
      </S.CardContainer>
    </>
  );
};
