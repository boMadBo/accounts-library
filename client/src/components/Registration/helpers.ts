import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  fullName: yup.string().typeError('Should be string').required('Please input your username'),
  password: yup.string().typeError('Should be string').required('Please input your password'),
  birthDate: yup.date().typeError('Should be a date').required('Please input your date of birth'),
  email: yup.string().typeError('Should be string').email('Please input a valid email').required('Please input your email'),
});

export const initialValues = {
  fullName: '',
  password: '',
  birthDate: '',
  email: '',
  avatarUrl: null,
  isMale: '',
};
