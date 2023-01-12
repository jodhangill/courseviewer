import React, {Component} from 'react';
import EmptyStar from '../assets/empty-star.svg';
import FilledStar from '../assets/filled-star.svg';

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = {currRating : 0}
    this.onHover = this.onHover.bind(this)
    this.onClick = this.onClick.bind(this) 
  }
 onHover(e) {
  if (e.target.className === 'star') {
   this.setRating(e.target.dataset.value)
  }
 }
 onClick(e) {
  if (e.target.dataset.value === this.state.currRating){
   this.setRating(e.target.dataset.value)
  }
 }
 setRating(value) {
   this.setState({currRating : value})
   this.props.form(value);
 }
 render(){
   return(
   [...Array(this.props.starCount).keys()].map((index) => {
   return (
    <img 
    onMouseOver={this.onHover}
    onClick={this.onClick}
    data-value={index + 1}
    className="star"   
    src={index + 1 <= this.state.currRating ? 
        FilledStar : EmptyStar}
    alt={index + 1 <= this.state.currRating ? 
        "filled star" : "empty star"} />)
    })
   )
  }
 }

export default Stars;
