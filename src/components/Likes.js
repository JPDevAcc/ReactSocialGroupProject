import Button from 'react-bootstrap/Button';

export default function Likes(props) {


  return (
    <div>
      <p>Likes: {props.likeCount} Dislikes: {props.dislikeCount}</p>
      <Button variant="primary" onClick={() => props.handleAddLike()}>Like</Button>
      <Button variant="primary" onClick={() => props.handleDislike()}>Dislike</Button>
    </div>
  );
}