import React, { useEffect, useState } from "react";
import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";
import { collection, getDocs } from "firebase/firestore";
import db from "../Firebase";
import { useNavigate } from "react-router-dom";





let reviews: any[] = [
]

//https://www.section.io/engineering-education/building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/
function Body({
  course,
  profilePic,
  difficulty,
  comment,
  reviewstamp,
}: {
  course: string
  firstName: string;
  lastName: string;
  profilePic: string;
  difficulty: number;
  comment: string;
  reviewstamp: number;
}) {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
      const getReview = async () => {
          const colRef = collection(db, course);
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach(doc => {
              console.log(doc.id);
              console.log(doc.data());
              reviews.push(doc.data());
              console.log(reviews);     
          })    
          setData(reviews); 
          console.log(data);  
      }
      getReview();
  }, [])
  if (data === null) {
    return (
      <Card>
      <CardBody>
        <CardTitle tag="h1">Reviews Page</CardTitle>
        <div>
          <span> Loading ... </span>
        </div>
      </CardBody>
    </Card>
    )
  }
  else if (data.length === 0) {
    return (
      <Card>
      <CardBody>
        <CardTitle tag="h1">Reviews Page</CardTitle>
        <div>
          <span> No reviews yet </span>
        </div>
      </CardBody>
    </Card>
    )
  }
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h1">Reviews Page</CardTitle>
        <div className="reviews-top">
            {reviews.map((data, i) => 
              <div>
                <div className="user-details">

                  <CardSubtitle className="mb-2 prof-muted" tag="h6">
                    {"Difficulty"}
                  </CardSubtitle>
                  {[...Array(data.difficulty || 5)].map((star) => {
                    return <CardSubtitle tag="h5">⭐ </CardSubtitle>;
                  })}
                </div>
                <div className="reviews-body">
                  <CardText>
                    {data.prof}
                  </CardText>
                </div>
                <CardText>
                  <small className="prof-muted prof-bold">
                    {data.review}
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