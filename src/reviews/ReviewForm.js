import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";

const ReviewForm = () => {
    const [reviews, setReviews] = useState("");
    const onChange = (e) => {
      setReviews(e.target.value);
    };
    const onSubmit = (e) => {
      console.log("Form Submitted");
    };
    return(
        <div className="form-container">
        <Form onSubmit={onSubmit}>
          <Input
            className="reviews-form"
            type="text"
            placeholder="enter you reviews"
            value={reviews}
            onChange={onChange}
          />
          <Button type="submit" style={{ background: "White" }}>
            Submit
          </Button>
        </Form>
      </div>
    ); 
}

export default ReviewForm