import Card from 'react-bootstrap/Card';
import Likes from './Likes';
import Comments from './Comments';
import "./socialCards.css"

export default function SocialCard(props) {
	const cardDef = props.cardDef ;
	const user = props.user ;

	// Simple handling of deleted users - this could be much improved
	let userImageUrl = (user) ? user.imageUrl : '' ;
	let username = (user) ? user.username : "deleted user" ;

	return (
		<Card className="social-card">
			<Card.Header>
				<div className="social-card-user-heading">
					<div className="user-avatar">
						<img src={userImageUrl} alt="" />
					</div>
					<div className="post-username">{username}</div>
				</div>
			</Card.Header>
			<Card.Img variant="top" src={cardDef.imageUrl} />
			<Card.Body>
				<Card.Text>
					{cardDef.text}
				</Card.Text>
				<Likes 
				likeCount={cardDef.likeCount} 
				dislikeCount={cardDef.dislikeCount}
				handleAddLike={() => props.handleAddLike()} 
				handleDislike={() => props.handleDislike()}					
				/>
				<Comments comments={cardDef.comments} />
				
			</Card.Body>
		</Card>
	)
}