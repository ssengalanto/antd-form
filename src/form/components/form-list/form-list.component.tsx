/* eslint-disable react/jsx-curly-newline */
import React, { useCallback } from 'react';
import { Input, Form } from 'antd';

import { FormData } from 'form/mocks';
import { useForm } from 'form/use-form.hook';

interface Props {
  data: FormData[];
  fields: ReturnType<typeof useForm>['models']['fields'];
  actions: Pick<
    ReturnType<typeof useForm>['operations'],
    'handlePetQuestionOnChange' | 'handleAdditionalNotesOnChange'
  >;
}

export const FormList: React.FC<Props> = ({ fields, data, actions }) => {
  const getByPetId = useCallback(
    (id: string): FormData | undefined => data.find((data) => data.id === id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return !fields.selected.length ? null : (
    <>
      {fields.selected.map((id) => {
        const data = getByPetId(id);
        return (
          data && (
            <Form.Item key={data.id} label={`${data.pet} question/s:`}>
              {data.questions.map((question) => {
                const existingPetData = fields.data[data.id];
                const defaultInputValue =
                  existingPetData && existingPetData[question.id]
                    ? existingPetData[question.id]
                    : '';
                return (
                  <Form.Item key={question.id} label={question.content}>
                    <Input
                      value={defaultInputValue}
                      onChange={(e) =>
                        actions.handlePetQuestionOnChange({
                          value: e.target.value,
                          petId: data.id,
                          questionId: question.id,
                        })
                      }
                    />
                  </Form.Item>
                );
              })}
            </Form.Item>
          )
        );
      })}
      <Form.Item label="Additional notes">
        <Input.TextArea
          value={fields.notes}
          onChange={(e) => actions.handleAdditionalNotesOnChange(e.target.value)}
        />
      </Form.Item>
    </>
  );
};
