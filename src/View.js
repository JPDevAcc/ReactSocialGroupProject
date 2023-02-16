import SocialCards from "./components/socialCards";
import Comments from "./components/Comments";
import Likes from "./components/Likes";

export default function View(props) {
	return (
		<div>
		<h1>Posts</h1>
			<SocialCards cardDefs={props.cardDefs} users={props.users} likeCount={props.likeCount} handleAddLike={props.handleAddLike} handleDislike={props.handleDislike} />
			

		</div>
	);
}