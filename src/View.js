import SocialCards from "./components/socialCards";

export default function View(props) {
	return (
		<div>
		<h1>Posts</h1>
			<SocialCards cardDefs={props.cardDefs} users={props.users} handleAddLike={props.handleAddLike} />
		</div>
	);
}