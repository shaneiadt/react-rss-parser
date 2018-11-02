import React from 'react';
import styles from './Feed.module.css';

const feed = (props) => {
    return(
        <div className={styles.feed}>
            <h3>{props.title}</h3>
            <p>{props.url}</p>
            <p>Items({props.itemsCount})</p>
        </div>
    );
}

export default feed;