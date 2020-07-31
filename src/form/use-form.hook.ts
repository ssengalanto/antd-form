/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import { DataObject } from 'shared/types';

interface FormState {
  selected: string[];
  data: DataObject;
  notes: string;
}

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

  const handlePetSelection = (id: string[]): void => {
    setFields({ ...fields, selected: id });
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
      handlePetSelection,
      handlePetQuestionOnChange,
      handleAdditionalNotesOnChange,
    },
  };
};
