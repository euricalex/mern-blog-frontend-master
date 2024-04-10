import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthRegister, selectIsAuth } from '../../components/redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

  const {register, handleSubmit,  formState:{errors, isValid}} = useForm({
    defaultValues: {
      fullname: 'Alexander Yuriev',
      email: 'test112@gmail.com',
      password: '1234'
    },
    mode: 'onChange',
  });

  const onSubmit = async(values) => {
    const data = await dispatch(fetchAuthRegister(values));
    if(!data.payload) {
     return alert('No registration');
    }
    if('token' in data.payload) {
     window.localStorage.setItem('token', data.payload.token);
    } else {
     alert('No registration');
    }
   };
   if(isAuth) {
     return <Navigate to = "/"/>;
   }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
 <TextField
        className={styles.field}
        label="Name"
        error = {Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required: 'Enter a fullname'})}
        fullWidth
      />
        <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Enter an email'})}
        type="email"
        fullWidth
      />
        <TextField
        className={styles.field}
        label="Password"
        error = {Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Enter a password'})}
        type="password"
        fullWidth
      />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
 </form>
    </Paper>
  );
};
