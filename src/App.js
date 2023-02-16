/* This project is based off https://github.com/TDAWebDevBootcamp/Example-Todo-list */

import React, {useState, useEffect} from 'react';
import { Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MyNavBar from './components/navbar' ;
import UserRegister from './UserRegister' ;
import View from './View'
import Add from './Add';
import Likes from './components/Likes';

function App() {
	// Hard-coded users for now
	const defaultUser = {
		username: 'Bob', imageUrl: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
	} ;
	const [users, changeUsers] = useState({
		0: { ...defaultUser },
	}) ;
	const [nextUserId, changeNextUserId] = useState(1) ; // TODO: Change to zero when test user removed
	const [currentUserId, changeCurrentUserId] = useState(0) ; 

	function getNextUserId() {
		const nextIdTemp = nextUserId ;
		changeNextUserId(a => a + 1) ;
		return nextIdTemp ;
	}

  const [cardDefs, changeCardDefs] = useState({}) ;
	const [nextPostId, changeNextPostId] = useState(0) ;

	function getNextPostId() {
		const nextPostIdTemp = nextPostId ;
		changeNextPostId(a => a + 1) ;
		return nextPostIdTemp ;
	}

	function addUser(newUser) {
		const userId = getNextUserId() ;
		const user = { [userId]: newUser };
    localStorage.setItem("users", JSON.stringify({...users, ...user}))
    changeUsers((users) => ({...users, ...user}));
		changeCurrentUserId(userId) ; // Just switch to the new user for now | TODO: Remove this when user-login implemented
	}

  const addCard = (userId, imageUrl, text) => {
    const cardDef = { [getNextPostId()]: {userId, imageUrl, text, dislikeCount: 0, likeCount: 0,} };
    localStorage.setItem("cardDefs", JSON.stringify({...cardDefs, ...cardDef}))
    changeCardDefs((cardDefs) => ({...cardDefs, ...cardDef}));
  }

//   const [likeCount, setLikeCount] = useState(0);

  

	function handleAddLike(postId) {
		const changeLikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;

			cardDefsNew[postId] = {...cardDefsNew[postId], likeCount: cardDefsNew[postId].likeCount + 1} ;

			localStorage.setItem("cardDefs", JSON.stringify(cardDefsNew)) ;
			return cardDefsNew ;
		}
		changeCardDefs(changeLikeCountFunc) ;
	}

	function handleDislike(postId) {
		// console.log(dislikeCount)
		const changeDislikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;
			cardDefsNew[postId] = {...cardDefsNew[postId] , dislikeCount: cardDefsNew[postId].dislikeCount + 1} ;
			localStorage.setItem("cardDefs", JSON.stringify(cardDefsNew)) ;
			return cardDefsNew ;
		}
		changeCardDefs(changeDislikeCountFunc) ;
	}

	// Restore from localStorage on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) ;
		const cardDefs = JSON.parse(localStorage.getItem("cardDefs")) ;
    initWithData(users, cardDefs) ;
  }, []) ;

	function initWithData(users, cardDefs) {
		if (!users) users = { 0: {...defaultUser} } ;
		if (!cardDefs) cardDefs = {} ;
		changeUsers(users) ;
		changeCurrentUserId(Object.keys(users).length - 1) ; // (just select last user again for now)
		changeNextUserId(Object.keys(users).length) ;
		changeCardDefs(cardDefs) ;
		changeNextPostId(Object.keys(cardDefs).length) ;
	}

	// Clear everything!
	function clearData() {
		initWithData({ 0: {...defaultUser} }, {}) ;
		localStorage.clear() ;
	}

	return (
		<div>

			<MyNavBar clearData={clearData} />

			<Container>
				<Routes>
					<Route path="/" element={
						<View cardDefs={cardDefs} users={users} handleDislike={(postId) => handleDislike(postId)} handleAddLike={(postId) => handleAddLike(postId)} />
					} />

					<Route path="/register" element={
						<UserRegister onSubmit={addUser} />
					} />
					
					<Route path="/view" element={
						<View cardDefs={cardDefs} users={users} handleDislike={(postId) => handleDislike(postId)} handleAddLike={(postId) => handleAddLike(postId)} />
					} />

					<Route path="/add" element={
						<Add onSubmit={(imageUrl, text) => addCard(currentUserId, imageUrl, text)} />
					} />
					
				</Routes>
			</Container>
		</div>
	);

}
export default App;