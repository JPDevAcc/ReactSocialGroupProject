import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Likes from './Likes';
import Comments from './Comments';
import Comment from './Comment';
import "./socialCards.css"

export default function SocialCard(props) {
	const cardDef = props.cardDef ;
	const user = props.user ;

	return (
		<>
		<Card className="social-card">
			<Card.Header>
				<div className="social-card-user-heading">
					<div className="user-avatar">
						<img src={user.imageUrl} alt="" />
					</div>
					<div>{user.username}</div>
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
		
		</>
	)
}