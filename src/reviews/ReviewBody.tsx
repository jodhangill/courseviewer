import React from "react";
import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";
import Moment from 'react-moment';

const dateToFormat = new Date();

const Reviews = [
  {
    stars: 4,
    text: 'Aye Okay',
    time: dateToFormat
  },
  {
    stars: 2,
    text: 'Negative',
    time: dateToFormat
  }
]

//https://www.section.io/engineering-education/building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/
function Body({
  firstName,
  lastName,
  profilePic,
  stars,
  comment,
  timestamp,
}: {
  firstName: string;
  lastName: string;
  profilePic: string;
  stars: number;
  comment: string;
  timestamp: number;
}) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h1">Reviews Page</CardTitle>
        <div className="reviews-top">
            {Reviews.map((data, i) => 
              <div>
                <div className="user-details">

                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {firstName} {lastName || "John Doe"}
                  </CardSubtitle>
                  {[...Array(data.stars || 5)].map((star) => {
                    return <CardSubtitle tag="h5">⭐ </CardSubtitle>;
                  })}
                </div>
                <div className="reviews-body">
                  <CardText>
                    {data.text}
                  </CardText>
                </div>
                <CardText>
                  <small className="text-muted text-bold">
                    <Moment date={data.time} />
                  </small>

                </CardText>
              </div>
            )}
        </div>
      </CardBody>
    </Card>
  );
}

export default Body;