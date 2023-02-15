import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function Likes(props) {

  // const [likeCount, setLikeCount] = useState(0);

  // const handleAddLike = () => {
  //     setLikeCount(likeCount + 1);
  // }

  // const handleSubtractLike = () => {
  //   if (likeCount > 0) {
  //     setLikeCount(likeCount - 1);
  //   }
  // }

  return (
    <div>
      <p>Likes: {props.likeCount} Dislikes: {props.dislikeCount}</p>
      <Button variant="primary" onClick={() => props.handleAddLike()}>Like</Button>
      <Button variant="primary" onClick={() => props.handleDislike()}>Dislike</Button>
    </div>
  );
}