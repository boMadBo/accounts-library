import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().typeError('Should be string').email('Please input a valid email').required('Please input your email'),
  password: yup.string().typeError('Should be string').required('Please input your password'),
});

export const initialValues = {
  email: '',
  password: '',
};
