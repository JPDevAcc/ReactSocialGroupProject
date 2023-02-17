import Comment from "./Comment";
import "./socialCards.css"

export default function Comments(props) {
  const comments = Object.entries(props.comments).map(([commentId, commentDef]) => {
    
    return (
      <Comment commentDef={commentDef} key={commentId} />
    );
  });

  return (
    <div className="comment-container">
      {comments}
    </div>
  );
}