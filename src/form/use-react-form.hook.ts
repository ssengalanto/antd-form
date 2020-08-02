/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { DataObject } from 'shared/types';

import { FormData } from './mocks';

interface FormState {
  selected: string[];
  data: DataObject;
  notes: string;
}

const defaultValues: FormState = {
  selected: [],
  data: {},
  notes: '',
};

export type useReactFormType = ReturnType<typeof useReactForm>;

export const useReactForm = () => {
  const { setValue, watch, register } = useForm({ defaultValues });

  useEffect(() => {
    Object.keys(defaultValues).forEach((key) => {
      register({ name: key });
    });
  }, [register]);

  const fields = watch();

  const validateInputs = (): FormState => {
    if (!fields.selected.length) {
      return defaultValues;
    }

    const dataKeys = Object.keys(fields.data);
    const updatedFields = { ...fields };

    dataKeys.forEach((id) => {
      if (!fields.selected.includes(id)) {
        delete updatedFields.data[id];
      }
    });

    return updatedFields;
  };

  const handleSelection = (id: string, isSelected: boolean): void => {
    if (isSelected) {
      setValue(
        'selected',
        fields.selected.filter((itemId) => itemId !== id),
      );
      return;
    }
    setValue('selected', fields.selected.concat(id));
  };

  const handleSelectAll = (data: FormData[]) => {
    if (data.length === fields.selected.length) {
      setValue('selected', []);
      return;
    }
    setValue(
      'selected',
      data.map((item) => item.id),
    );
  };

  const handleQuestionOnChange = (payload: {
    value: string;
    petId: string;
    questionId: string;
  }) => {
    const { value, petId, questionId } = payload;

    const updatedData = fields.data[petId] ? { ...fields.data[petId] } : {};

    updatedData[questionId] = value;

    setValue('data', { ...fields.data, [petId]: { ...updatedData } });
  };

  const handleNotesOnChange = (notes: string): void => {
    setValue('notes', notes);
  };

  const handleSubmit = () => {
    const data = validateInputs();
    alert(JSON.stringify(data, null, 2));
  };

  return {
    models: { fields },
    operations: {
      handleSubmit,
      handleSelection,
      handleSelectAll,
      handleQuestionOnChange,
      handleNotesOnChange,
    },
  };
};
