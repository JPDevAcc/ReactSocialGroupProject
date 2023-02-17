import SocialCard from "./socialCard" ;
import Addc from './Addc.js';
import "./socialCards.css"


export default function SocialCards(props) {
	console.log(props.cardDefs) ;
	const socialCards = Object.entries(props.cardDefs).map(([postId, cardDef]) => {
	  console.log({postId})
	  
		const handleAddLike = () => {
			props.handleAddLike(postId) ;
		} ;
    
		const handleDislike = () => {
			props.handleDislike(postId) ;
		} ;
		const addComments = (text) => {
			props.onSubmit(text, postId) ;
		} ;

		return (
			<>
			<div className="single-post" key={postId} >
				<SocialCard cardDef={cardDef} user={props.users[cardDef.userId]} handleAddLike={handleAddLike} handleDislike={handleDislike} />
				<Addc onSubmit={addComments} />
			</div>
			</>
		) ;
}) ;
	
	return (
		<div className="social-cards">
			{socialCards}
		</div>
	)
}