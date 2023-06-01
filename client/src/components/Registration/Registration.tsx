import FormikTF from '@/components/helpers/FormikTF';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchRegister } from '@/rdx/reducers/registerSlice';
import Avatar from '@/uikit/Avatar';
import SendButtom from '@/uikit/SendButtom';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IRegister } from '../../interfaces';
import style from './Registration.module.css';
import { initialValues, validationSchema } from './helpers';

const Registration = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isReg = useAppSelector((state) => state.registerSlice.isReg);

  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (values: IRegister) => {
      const formData = new FormData();
      const gender = values.isMale === 'Male' ? true : false;
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('fullName', values.fullName);
      formData.append('birthDate', values.birthDate);
      formData.append('isMale', gender.toString());
      if (selectedFile) {
        formData.append('avatar', selectedFile, selectedFile.name);
      } else {
        formData.append('avatar', '');
      }
      dispatch(fetchRegister(formData));
    },
    [dispatch, selectedFile],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64Data = fileReader.result;
        setPreviewUrl(base64Data as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  if (isReg) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className={style.registration}>
      <Formik initialValues={initialValues} validateOnBlur validationSchema={validationSchema} onSubmit={handleChange}>
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={style.container}>
            <FormikTF name="fullName" type="text" label="Your username" />
            <FormikTF name="password" type="password" label="Your password" />
            <FormikTF name="email" type="email" label="Your email" />
            <div className={style.date_wrap}>
              <span className={style.text}>Your birthday</span>
              <div className={style.date_group}>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={values.birthDate}
                  min="1950-01-01"
                  max="2012-12-31"
                  onChange={(e) => setFieldValue('birthDate', e.target.value)}
                  className={style.input}
                />
                <div className={style.date}>{values.birthDate}</div>
              </div>
            </div>

            <div role="group" aria-labelledby="my-radio-group" className={style.gender_wrap}>
              <span className={style.text}>Your gender</span>
              <div className={style.gender_group}>
                <label className={style.variants}>
                  <Field type="radio" name="isMale" value="Male" />
                  Male
                </label>
                <label className={style.variants}>
                  <Field type="radio" name="isMale" value="Female" />
                  Female
                </label>
                <div className={style.gender}>{values.isMale}</div>
              </div>
            </div>

            <div className={style.avatar_wrap}>
              <span className={style.text}>Your avatar</span>
              <div className={style.avatar}>
                <Avatar handleFileChange={handleFileChange} selectedFile={selectedFile} />
                {previewUrl && (
                  <div className={style.image}>
                    <img src={previewUrl} alt="Preview" className={style.img} />
                  </div>
                )}
              </div>
            </div>
            <SendButtom text="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default React.memo(Registration);
