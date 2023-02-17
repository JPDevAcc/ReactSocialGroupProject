import SocialCards from "./components/socialCards";
import "./View.css" ;


export default function View(props) {
	return (
		<>
		<h1 className="heading">Posts</h1>
		<div className="posts-container">
			<SocialCards onSubmit={props.onSubmit} cardDefs={props.cardDefs} users={props.users} likeCount={props.likeCount} handleAddLike={props.handleAddLike} handleDislike={props.handleDislike} />
		

		</div>
		</>
	);
}