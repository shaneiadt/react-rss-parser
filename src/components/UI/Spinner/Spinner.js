import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => {
    return (
        <div className={styles["spinner"]}>
            <div className={styles["double-bounce1"]}></div>
            <div className={styles["double-bounce2"]}></div>
        </div>
    );
}

export default spinner;