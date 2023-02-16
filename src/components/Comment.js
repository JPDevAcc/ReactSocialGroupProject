
function Comment(props){
  const commentDef = props.commentDef;

  return (
		<div>
					<div>
          <h3>{commentDef.name}</h3>
					<p>{commentDef.text}</p>
          </div>			
		</div>
  );

}
export default Comment;
