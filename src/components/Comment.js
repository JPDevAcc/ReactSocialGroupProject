
function Comment(props){
  const commentDef = props.commentDef;

  return (
		<div>
					<div>
          <h5>{commentDef.name}</h5>
					<p>{commentDef.text}</p>
          </div>			
		</div>
  );

}
export default Comment;
