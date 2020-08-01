/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm } from 'react-hook-form';

import { DataObject } from 'shared/types';

import { FormData } from './mocks';

interface FormState {
  selected: string[];
  data: DataObject;
  notes: string;
}

export type useReactFormType = ReturnType<typeof useReactForm>;

export const useReactForm = () => {
  const form = useForm<FormState>({
    defaultValues: {
      selected: [],
      data: {},
      notes: '',
    },
  });

  const { setValue, getValues } = form;

  const fields = getValues();

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

  const handleSubmit = () => {
    const data = validateInputs();
    alert(JSON.stringify(data, null, 2));
  };

  return {
    models: { form, fields },
    operations: {
      handleSubmit,
      handleSelection,
      handleSelectAll,
    },
  };
};
