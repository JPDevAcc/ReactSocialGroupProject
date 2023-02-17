import "./socialCards.css"

function Comment(props){
  const commentDef = props.commentDef;

  return (
		<div className="comment">
      <h5>{commentDef.name}</h5>
			<p>{commentDef.text}</p>		
		</div>
  );
}
export default Comment;