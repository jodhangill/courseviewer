import { Button } from 'bootstrap';
import React from 'react';


const ReviewButton = ({btnText, btnRef, showModal}) => {
    return (
        <button
            className='btn btn-lg btn-secondary center modal-button'
            style={{
                marginBottom : 10,
                width : "60vw"
            }}
            ref={btnRef}
            onClick={showModal}
        >
           Review {btnText}
        </button>
    )
}

export default ReviewButton;
