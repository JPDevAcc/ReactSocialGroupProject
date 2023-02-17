import { useParams } from 'react-router';
import Card from 'react-bootstrap/Card';
import "./Profile.css"

export default function Profile({users, currentUserId}) {
	let { userId } = useParams(); 
	const user = users[((userId === 'current') ? currentUserId : userId)] ;

  return (
		<div>
			<h1>User Profile</h1>
			<Card className="profile-card">
				<Card.Header>
					<div className="profile-card-user-heading">
						<div className="user-avatar">
							<img src={user.imageUrl} alt="" />
						</div>
						<div className="user-name">{user.username}</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{user.bio}
					</Card.Text>					
				</Card.Body>
			</Card>
		</div>
  );
}