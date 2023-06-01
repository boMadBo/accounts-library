import FormikTF from '@/components/helpers/FormikTF';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IMeUpdateValues } from '@/interfaces';
import { fetchAccount } from '@/rdx/reducers/accountSlice';
import { fetchUpdate } from '@/rdx/reducers/updateSlice';
import Avatar from '@/uikit/Avatar';
import SendButtom from '@/uikit/SendButtom';
import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import style from './Account.module.css';
import { initialValues, validationSchema } from './helpers';

const Account = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const me = useAppSelector((state) => state.accountSlice.me);

  const isAuth = useAppSelector((state) => state.loginSlice.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccount());
  }, []);

  const handleChange = useCallback(
    async (values: IMeUpdateValues, { resetForm }: { resetForm: () => void }) => {
      const formData = new FormData();
      formData.append('password', values.password);
      formData.append('fullName', values.fullName);
      if (selectedFile) {
        formData.append('avatar', selectedFile, selectedFile.name);
      } else {
        formData.append('avatar', '');
      }
      await dispatch(fetchUpdate(me._id, formData));
      await dispatch(fetchAccount());
      await resetForm();
      setSelectedFile(null);
      setPreviewUrl(null);
    },
    [dispatch, selectedFile, me._id],
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

  if (!isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className={style.account}>
      <Formik initialValues={initialValues} validateOnBlur validationSchema={validationSchema} onSubmit={handleChange}>
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={style.container}>
            <div className={style.data}>
              <div className={style.section}>
                <div className={style.text_wrap}>
                  <div className={style.text}>{me?.fullName}</div>
                </div>
                <FormikTF name="fullName" type="text" label="New username" />
              </div>
              <div className={style.bottom_br}></div>

              <div className={style.section}>
                <div className={style.text_wrap}>
                  <div className={style.text}>Password</div>
                </div>
                <FormikTF name="password" type="password" label="New password" />
              </div>
              <div className={style.bottom_br}></div>

              <div className={style.avatar}>
                <div className={style.image}>
                  <img src={previewUrl ? previewUrl : me?.avatarUrl} alt="Preview" className={style.img} />
                </div>
                <div className={style.new_avatar}>
                  <span className={style.text_ava}>New avatar</span>
                  <Avatar selectedFile={selectedFile} handleFileChange={handleFileChange} />
                </div>
              </div>
              <div className={style.bottom_br}></div>

              <SendButtom text="Submit" disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default React.memo(Account);
