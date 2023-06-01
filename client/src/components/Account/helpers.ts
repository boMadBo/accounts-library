import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  fullName: yup.string().optional().typeError('Should be string'),
  password: yup.string().optional().typeError('Should be string'),
});

export const initialValues = {
  _id: '',
  fullName: '',
  password: '',
  avatarUrl: null,
};
