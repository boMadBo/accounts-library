import TField from '@/uikit/TField';
import { useField } from 'formik';
import React from 'react';

const FormikTF = ({ name, ...props }: any) => {
  const [field, meta] = useField({ name });

  const { onBlur, value } = field;
  const { touched, error } = meta;

  return (
    <TField
      name={name}
      label={props.label}
      error={Boolean(touched && error)}
      helperText={touched && error}
      onChange={field.onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default React.memo(FormikTF);
