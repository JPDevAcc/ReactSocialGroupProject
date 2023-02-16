import SocialCards from "./components/socialCards";

export default function View(props) {
	return (
		<div>
		<h1>Posts</h1>
			<SocialCards onSubmit={props.onSubmit} cardDefs={props.cardDefs} users={props.users} likeCount={props.likeCount} handleAddLike={props.handleAddLike} handleDislike={props.handleDislike} />
		</div>
	);
}