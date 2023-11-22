import React from 'react';
import styles from './NotFoundComponent.module.css';

const NotFoundComponent = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.forest}>
        {/* Árboles */}
        <div className={`${styles.tree} ${styles.tree1}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree2}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree3}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree4}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree5}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree6}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>

        <div className={`${styles.tree} ${styles.tree7}`}>
          <div className={styles.branch + ' ' + styles['branch-top']}></div>
          <div className={styles.branch + ' ' + styles['branch-middle']}></div>
          <div className={styles.branch + ' ' + styles['branch-bottom']}></div>
        </div>
      </div>

      {/* Tienda de campaña */}
      <div className={styles.tent}>
        <div className={styles.roof}></div>
        <div className={styles['roof-border-left']}>
          <div className={styles['roof-border'] + ' ' + styles['roof-border1']}></div>
          <div className={styles['roof-border'] + ' ' + styles['roof-border2']}></div>
          <div className={styles['roof-border'] + ' ' + styles['roof-border3']}></div>
        </div>
        <div className={styles.entrance}>
          <div className={`${styles.door} ${styles['left-door']}`}>
            <div className={styles['left-door-inner']}></div>
          </div>
          <div className={`${styles.door} ${styles['right-door']}`}>
            <div className={styles['right-door-inner']}></div>
          </div>
        </div>
      </div>

      {/* Suelo */}
      <div className={styles.floor}>
        <div className={`${styles.ground} ${styles.ground1}`}></div>
        <div className={`${styles.ground} ${styles.ground2}`}></div>
      </div>

      {/* Chimenea */}
      <div className={styles.fireplace}>
        <div className={styles.support}></div>
        <div className={styles.support}></div>
        <div className={styles.bar}></div>
        <div className={styles.hanger}></div>
        <div className={styles.smoke}></div>
        <div className={styles.pan}></div>
        <div className={styles.fire}>
          <div className={`${styles.line} ${styles.line1}`}>
            <div className={`${styles.particle} ${styles.particle1}`}></div>
            <div className={`${styles.particle} ${styles.particle2}`}></div>
            <div className={`${styles.particle} ${styles.particle3}`}></div>
            <div className={`${styles.particle} ${styles.particle4}`}></div>
          </div>
          <div className={`${styles.line} ${styles.line2}`}>
            <div className={`${styles.particle} ${styles.particle1}`}></div>
            <div className={`${styles.particle} ${styles.particle2}`}></div>
            <div className={`${styles.particle} ${styles.particle3}`}></div>
            <div className={`${styles.particle} ${styles.particle4}`}></div>
          </div>
          <div className={`${styles.line} ${styles.line3}`}>
            <div className={`${styles.particle} ${styles.particle1}`}></div>
            <div className={`${styles.particle} ${styles.particle2}`}></div>
            <div className={`${styles.particle} ${styles.particle3}`}></div>
            <div className={`${styles.particle} ${styles.particle4}`}></div>
          </div>
        </div>
      </div>

      {/* Hora */}
      <div className={styles['time-wrapper']}>
        <div className={styles.time}>
          <div className={styles.day}></div>
          <div className={styles.night}>
            <div className={styles.moon}></div>
            <div className={`${styles.star} ${styles.star1} ${styles['star-big']}`}></div>
            <div className={`${styles.star} ${styles.star2} ${styles['star-big']}`}></div>
            <div className={`${styles.star} ${styles.star3} ${styles['star-big']}`}></div>
            <div className={styles.star + ' ' + styles.star4}></div>
            <div className={styles.star + ' ' + styles.star5}></div>
            <div className={styles.star + ' ' + styles.star6}></div>
            <div className={styles.star + ' ' + styles.star7}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
