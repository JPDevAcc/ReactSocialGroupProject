import Card from 'react-bootstrap/Card';

export default function SocialCard(props) {
	const cardDef = props.cardDef ;
	const user = props.user ;

	return (
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
			</Card.Body>
		</Card>
	)
}