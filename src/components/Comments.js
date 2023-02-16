import Comment from "./Comment";

export default function Comments(props) {
  const comments = Object.entries(props.comments).map(([commentId, commentDef]) => {
    console.log({commentId})
    
    return (
      
      <Comment commentDef={commentDef} key={commentId} />
      
    );
  });

  return (
    <div>
      {comments}
    </div>
  );
}