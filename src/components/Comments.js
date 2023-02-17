import Comment from "./Comment";
import "./socialCards.css"

export default function Comments(props) {
  const comments = Object.entries(props.comments).map(([commentId, commentDef]) => {
    console.log({commentId})
    
    return (
      <div className="comment">
      <Comment commentDef={commentDef} key={commentId} />
      </div>
    );
  });

  return (
    <div className="comment-container">
      {comments}
    </div>
  );
}