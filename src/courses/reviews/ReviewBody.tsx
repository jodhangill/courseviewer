import React, { useEffect, useState } from "react";
import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";
import { collection, getDocs} from "firebase/firestore";
import db from "../../Firebase";
import { useNavigate } from "react-router-dom";
import FilledStar from '../../assets/filled-star.svg';
import Moment from "react-moment";
import Timestamp from "react-timestamp";
import { toDate } from 'react-timestamp/dist/util';


let overallDifficulty = 0;
let n = 0;

const colors = [
  'rgb(0, 230, 0)',
  'rgb(100, 230, 0)',
  'rgb(230, 230, 0)',
  'rgb(230, 0, 0)',
  'rgb(230, 0, 0)'
]

//https://www.section.io/engineering-education/building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/
function Body({
  course
}: {
  course: string

}) {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
      let reviews: any[] = []
      const getReview = async () => {
          const colRef = collection(db, course);
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach(doc => {
              if (doc.data().active === true) {
                reviews.push(doc.data());    
                overallDifficulty += Number(doc.data().difficulty);
                n++;                
              }

          })    
          setData(reviews.sort(function(a,b){
            if (b.date == null) {
              return -1;
            }
            if (a.date == null) {
              return 1;
            }
            return b.date.toDate() - a.date.toDate();
          })); 
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
          <div className="overall-difficulty">
            <h2> Overall Difficulty:</h2>
            <h2 style={{color: colors[Math.round(overallDifficulty/n) - 1]}}>{overallDifficulty != 0 ? (overallDifficulty/n).toFixed(1) : ''}</h2>            
          </div>

            {data.map((data) => 
              <div className="review">
                <small>
                  {data.date != null ? <Timestamp relative className="text-muted" date={data.date.toDate()}></Timestamp> : "No date"}
                </small>                 
                <div className="difficulty-details">
                  <CardSubtitle className="mb-2" tag="h6">
                    {"Difficulty: "}
                  </CardSubtitle>
                  {[...Array(Number(data.difficulty) || 0)].map((star) => {
                    return <img 
                    className="star"   
                    src={FilledStar}/>;
                  })}
                </div>
                <div className="reviews-body">
                  <CardText>
                    {data.review}
                  </CardText>
                </div>
                <CardText>
                  <small className="text-muted">
                    Professor: {data.prof}
                  </small><br/>
                </CardText>
              </div>
            )}
        </div>
      </CardBody>
    </Card>
  );
}

export default Body;