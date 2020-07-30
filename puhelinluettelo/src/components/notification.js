import React from 'react';
import '../styles/styles.css';

const Notification = ({message, styling}) => {
    return (
        <div className={styling}>
            <p>{message}</p>
        </div>
    );
}

export default Notification;