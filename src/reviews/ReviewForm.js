import React, { useState } from "react";
import Stars from "./Stars";

const ReviewForm = ({onSubmit}) => {
  const [data, setData] = useState('');
    const stars = (stars) => {
      setData(stars);
    };
    return(
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="stars">Stars</label>
          <Stars id="stars" starCount={5} form={stars}/>
          <input id="stars" value={data} disabled></input>          
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <input
            className="form-control"
            id="review"
            placeholder="Write your review"
          />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    ); 
}

export default ReviewForm
