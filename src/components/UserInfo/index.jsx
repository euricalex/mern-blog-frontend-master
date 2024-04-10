import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
    const avatarURL = process.env.PUBLIC_URL + '/noavatar.png';
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || avatarURL} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
