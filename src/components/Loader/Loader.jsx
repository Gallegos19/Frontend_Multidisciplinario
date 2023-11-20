import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div>
    <div className={styles.loader}>
  <div className={styles.leaf}></div>
  <div className={styles.leaf}></div>
  <div className={styles.leaf}></div>
</div>
</div>
  );
};

export default Loader;
