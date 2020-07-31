/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import { DataObject } from 'shared/types';
import { FormData } from './mocks';

interface FormState {
  selected: string[];
  data: DataObject;
  notes: string;
}

export type UseForm = ReturnType<typeof useForm>;

export const useForm = () => {
  const [fields, setFields] = useState<FormState>({
    selected: [],
    data: {},
    notes: '',
  });

  const validateInputs = (): FormState => {
    const dataKeys = Object.keys(fields.data);
    const updatedFields = { ...fields };

    dataKeys.forEach((id) => {
      if (!fields.selected.includes(id)) {
        delete updatedFields.data[id];
      }
    });

    return updatedFields;
  };

  const handleSelection = (id: string, selected: boolean): void => {
    if (selected) {
      setFields({ ...fields, selected: fields.selected.filter((itemId) => itemId !== id) });
      return;
    }
    setFields({ ...fields, selected: fields.selected.concat(id) });
  };

  const handleSelectAll = (data: FormData[]) => {
    if (data.length === fields.selected.length) {
      setFields({ ...fields, selected: [] });
      return;
    }
    setFields({ ...fields, selected: data.map((item) => item.id) });
  };

  const handlePetQuestionOnChange = (payload: {
    value: string;
    petId: string;
    questionId: string;
  }) => {
    const { value, petId, questionId } = payload;

    const updatedData = fields.data[petId] ? { ...fields.data[petId] } : {};

    updatedData[questionId] = value;

    setFields({
      ...fields,
      data: {
        ...fields.data,
        [petId]: { ...updatedData },
      },
    });
  };

  const handleSubmit = () => {
    const data = validateInputs();
    alert(JSON.stringify(data, null, 2));
  };

  const handleAdditionalNotesOnChange = (notes: string): void => {
    setFields({ ...fields, notes });
  };

  const handleError = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return {
    models: { fields },
    operations: {
      handleError,
      handleSubmit,
      handleSelectAll,
      handleSelection,
      handlePetQuestionOnChange,
      handleAdditionalNotesOnChange,
    },
  };
};
