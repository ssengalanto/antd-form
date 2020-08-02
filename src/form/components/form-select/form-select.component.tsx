import React, { useCallback } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';

import { FormData } from 'form/mocks';
import { useReactFormType } from 'form/use-react-form.hook';

import { S } from './form-select.styles';
import { FormSelectCard } from './form-select-card.component';

const { Text } = Typography;

interface Props {
  label: string;
  data: FormData[];
  description?: string;
  fields: useReactFormType['models']['fields'];
  actions: Pick<useReactFormType['operations'], 'handleSelection' | 'handleSelectAll'>;
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
              <S.Label data-test-id="form-select-component:label">{label}</S.Label>
              <Text data-test-id="form-select-component:count">{`${selectedCount}/${totalCount}`}</Text>
            </Space>
          </Row>
          {description && (
            <Text data-test-id="form-select-component:description">{description}</Text>
          )}
        </Col>
        <Col>
          <Button
            onClick={() => actions.handleSelectAll(data)}
            data-test-id="form-select-component:button"
          >
            {totalCount === selectedCount ? 'Deselect All' : 'Select All'}
          </Button>
        </Col>
      </Row>
      <S.CardContainer gutter={24}>
        {data.map((item) => (
          <Col key={item.id}>
            <FormSelectCard
              key={item.id}
              data={item}
              selected={isSelected(item.id)}
              onChange={actions.handleSelection}
              data-test-id="form-select-component:cards"
            />
          </Col>
        ))}
      </S.CardContainer>
    </>
  );
};
