import React from 'react';

const IconInst = ({ prop, size } : { prop?: string, size:string }) => {
    return (
        <svg className={size} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={prop} fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.23858 2.23858 0 5 0H18C20.7614 0 23 2.23858 23 5V17C23 19.7614 20.7614 22 18 22H5C2.23858 22 0 19.7614 0 17V5ZM11.5 17C15.0899 17 18 14.0899 18 10.5C18 6.91015 15.0899 4 11.5 4C7.91015 4 5 6.91015 5 10.5C5 14.0899 7.91015 17 11.5 17ZM11.5 14.8333C13.8932 14.8333 15.8333 12.8932 15.8333 10.5C15.8333 8.10677 13.8932 6.16667 11.5 6.16667C9.10677 6.16667 7.16667 8.10677 7.16667 10.5C7.16667 12.8932 9.10677 14.8333 11.5 14.8333ZM17 6C17.5523 6 18 5.55228 18 5C18 4.44772 17.5523 4 17 4C16.4477 4 16 4.44772 16 5C16 5.55228 16.4477 6 17 6Z" fill="white"/>
        </svg>
    );
};

export default IconInst;