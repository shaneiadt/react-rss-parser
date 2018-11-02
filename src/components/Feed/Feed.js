import React from 'react';

const feed = (props) => {
    return(
        <div>
            <h3>{props.title}</h3>
            <p>{props.url}</p>
        </div>
    );
}

export default feed;