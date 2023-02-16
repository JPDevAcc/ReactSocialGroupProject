/* This project is based off https://github.com/TDAWebDevBootcamp/Example-Todo-list */

import {useState, useEffect} from 'react';
import { Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MyNavBar from './components/navbar' ;
import UserRegister from './UserRegister' ;
import UserLogin from './UserLogin' ;
import View from './View'
import Add from './Add';

function App() {
	// Example user (as things currently break with no user on the system)
	const defaultUser = {
		username: 'Bob',
		password: 'DoNotDeleteMe!', // Who needs cryptographic hash functions? - Plaintext for the win!
		imageUrl: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
	} ;
	const [users, changeUsers] = useState({
		0: { ...defaultUser },
	}) ;
	const [nextUserId, changeNextUserId] = useState(1) ; // TODO: Change to zero when example user removed
	const [currentUserId, changeCurrentUserId] = useState(0) ; 

	// Get user id given username (case-insensitive)
	function getUserId(username) {
		username = username.toLowerCase() ;
		const matchingUsers = Object.entries(users).filter(([id, userData]) => userData.username.toLowerCase() === username) ;
		if (matchingUsers.length === 1) return matchingUsers[0][0] ;
		else if (matchingUsers.length === 0) return null ;
		else {
			console.error("Duplicate usernames in data") ;
			return null ;
		}
	}

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
	}

  const addCard = (userId, imageUrl, text) => {
    const cardDef = { [getNextPostId()]: {userId, imageUrl, text, likeCount: 0} };
    localStorage.setItem("cardDefs", JSON.stringify({...cardDefs, ...cardDef}))
    changeCardDefs((cardDefs) => ({...cardDefs, ...cardDef}));
  }

	function handleAddLike(postId) {
		const changeLikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;
			cardDefsNew[postId] = {...cardDefsNew[postId], likeCount: cardDefsNew[postId].likeCount + 1} ;
			localStorage.setItem("cardDefs", JSON.stringify(cardDefsNew)) ;
			return cardDefsNew ;
		}
		changeCardDefs(changeLikeCountFunc) ;
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

	function userLogin(formValues) {
		const userId = getUserId(formValues.username) ;
		const credentialsMatch = (userId !== null && formValues.password === users[userId].password) ; // User exists and passwords match?
		if (credentialsMatch) changeCurrentUserId(userId) ; // Make this the current user if credentials were okay
		return credentialsMatch ;
	}

	return (
		<div>

			<MyNavBar username={users[currentUserId].username} clearData={clearData} />

			<Container>
				<Routes>
					<Route path="/" element={
						<UserLogin onSubmit={userLogin} />
					} />

					<Route path="/register" element={
						<UserRegister getUserId={getUserId} onSubmit={addUser} />
					} />
					
					<Route path="/view" element={
						<View cardDefs={cardDefs} users={users} handleAddLike={(postId) => handleAddLike(postId)} />
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