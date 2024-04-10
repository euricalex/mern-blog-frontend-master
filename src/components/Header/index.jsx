import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/slices/auth';


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(state => state.auth.data);
const location = useLocation();
  const onClickLogout = () => {
    if(window.confirm('Are you sure want to log?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
   
    }
    
  };
const isLoginPage = location.pathname === '/login';
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {!isLoginPage && (
            <>
               {isAuth && userData ? (
                <Link className={styles.logo} to="/">
                <div>{`${userData.fullName} BLOG`}</div>
              </Link>
           ) : 
           <Link className={styles.logo} to="/">
           <div>BLOG</div>
         </Link>
           } 
           </>
          )}
          <div className={styles.emptyButton}></div>
      

       
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/login">
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
