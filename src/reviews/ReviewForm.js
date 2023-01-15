import React, { useState } from "react";
import Stars from "./Stars";

const ReviewForm = ({onSubmit}) => {
  const [difficulty, setDifficulty] = useState('');
  const [workload, setLoad] = useState('');
    const difValue = (difficulty) => {
      setDifficulty(difficulty);
    };
    return(
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <div>
            <input id="difficulty" value={difficulty} disabled></input>
            <Stars class="form-control"starCount={5} form={difValue}/>            
          </div>       
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea class="form-control" id="review" ></textarea>
        </div>
        <div>
          <label htmlFor="prof">Professor Name</label>    
          <input class="form-control" id="prof"></input>   
        </div>
        <div className="form-group">
          <br></br>
          <button className="form-control btn btn-light" type="submit">
            Submit
          </button>
        </div>
      </form>
    ); 
}

export default ReviewForm
