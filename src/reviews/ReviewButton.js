import { Button } from 'bootstrap';
import React from 'react';


const ReviewButton = ({btnText, btnRef, showModal}) => {
    return (
        <button
            className='btn btn-lg btn-secondary center modal-button'
            ref={btnRef}
            onClick={showModal}
        >
            {btnText}
        </button>
    )
}

export default ReviewButton;
