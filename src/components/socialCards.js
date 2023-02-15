import SocialCard from "./socialCard" ;



export default function SocialCards(props) {
  const socialCards = Object.entries(props.cardDefs).map(([postId, cardDef]) => {
		const handleAddLike = () => {
			props.handleAddLike(postId) ;
		} ;
		const handleDislike = () => {
			props.handleDislike(postId) ;
		} ;

		return (
			<SocialCard cardDef={cardDef} user={props.users[cardDef.userId]} handleAddLike={handleAddLike} handleDislike={handleDislike} key={postId} />
		) ;
}) ;
	
	return (
		<div className="social-cards">
			{socialCards}
		</div>
	)
}