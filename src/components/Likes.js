import Button from 'react-bootstrap/Button';
import "./socialCards.css"

export default function Likes(props) {


  return (
    <div className="like-container">
      <div>Likes: {props.likeCount} </div>
      <div> Dislikes: {props.dislikeCount}</div>
      <Button variant="primary" onClick={() => props.handleAddLike()}>Like 👍</Button>
      <Button variant="primary" onClick={() => props.handleDislike()}>Dislike 👎</Button>
    </div>
  );
}