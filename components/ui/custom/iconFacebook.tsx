import React from 'react';

const IconFacebook = ({ prop, size } : { prop?: string, size:string }) => {
    return (
        <svg className={size} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={prop} d="M26.6786 13.6037C26.6786 6.48879 20.9186 0.714355 13.8214 0.714355C6.72429 0.714355 0.964294 6.48879 0.964294 13.6037C0.964294 19.8422 5.38715 25.0366 11.25 26.2353V17.4705H8.67858V13.6037H11.25V10.3814C11.25 7.89373 13.2686 5.8701 15.75 5.8701H18.9643V9.73691H16.3929C15.6857 9.73691 15.1072 10.3169 15.1072 11.0258V13.6037H18.9643V17.4705H15.1072V26.4286C21.6 25.7842 26.6786 20.2933 26.6786 13.6037Z" fill="white"/>
        </svg>
    );
};

export default IconFacebook;