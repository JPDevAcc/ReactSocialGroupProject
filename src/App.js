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
import Footer from './components/footer';
import "./App.css"

function App() {
	// Users state
	const [users, changeUsers] = useState({}) ;
	const [nextUserId, changeNextUserId] = useState(0) ;
	const [currentUserId, changeCurrentUserId] = useState(null) ; // (initially no user logged in) 

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

  const addCard = (userId, imageUrl, text,) => {
    const cardDef = { [getNextPostId()]: {userId, imageUrl, text, dislikeCount: 0, likeCount: 0, comments: {}} };

    localStorage.setItem("cardDefs", JSON.stringify({...cardDefs, ...cardDef}))
    changeCardDefs((cardDefs) => ({...cardDefs, ...cardDef}));
  }

  const [nextCommentId, changeNextCommentId] = useState(0) ;

function getNextCommentId() {
	const nextComIdTemp = nextCommentId ;
	changeNextCommentId(a => a + 1) ;
	return nextComIdTemp ;
}

function addComment(name, text, postId) {
	const cardDefsNew = {...cardDefs} ;
	const commentDef = { [getNextCommentId()]: {name, text} };
	cardDefsNew[postId].comments = {...cardDefsNew[postId].comments, ...commentDef} ;
	changeCardDefs(cardDefsNew) ;
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
	// clearData() ;
    const users = JSON.parse(localStorage.getItem("users")) ;
		const cardDefs = JSON.parse(localStorage.getItem("cardDefs")) ;
		const commentDefs = JSON.parse(localStorage.getItem("commentDefs")) ;
    initWithData(users, cardDefs, commentDefs) ;
  }, []) ;

	function initWithData(users, cardDefs) {
		if (!users) users = {} ;
		if (!cardDefs) cardDefs = {} ;
		changeUsers(users) ;
		changeCurrentUserId(null) ; // (no logged in user)
		changeNextUserId(Object.keys(users).length) ;
		changeCardDefs(cardDefs) ;
		changeNextPostId(Object.keys(cardDefs).length) ;
	}

	// Clear everything!
	function clearData() {
		initWithData() ;
		localStorage.clear() ;
	}

	function userLogin(formValues) {
		const userId = getUserId(formValues.username) ;
		const credentialsMatch = (userId !== null && formValues.password === users[userId].password) ; // User exists and passwords match?
		if (credentialsMatch) changeCurrentUserId(userId) ; // Make this the current user if credentials were okay
		return credentialsMatch ;
	}

	function userLogout() {
		changeCurrentUserId(null) ;
	}

	return (
		<div>
			<MyNavBar username={currentUserId === null ? null : users[currentUserId].username} userLogout={userLogout} clearData={clearData} />

			<Container className="my-container">
				<Routes>
					<Route path="/" element={
						<UserLogin onSubmit={userLogin} />
					} />

					<Route path="/register" element={
						<UserRegister getUserId={getUserId} onSubmit={addUser} />
					} />
					
          {currentUserId !== null &&
					<Route path="/view" element={
						<View onSubmit={ addComment } cardDefs={cardDefs} users={users} handleDislike={(postId) => handleDislike(postId)} handleAddLike={(postId) => handleAddLike(postId)} />
           } />}
 
					{currentUserId !== null &&
						<Route path="/add" element={
							<Add onSubmit={(imageUrl, text) => addCard(currentUserId, imageUrl, text)} />
					} />}
					
				</Routes>

			</Container>
			<Footer className="footer"/>
			
		</div>
	);
}
export default App;