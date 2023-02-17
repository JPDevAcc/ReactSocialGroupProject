/* This project is based off https://github.com/TDAWebDevBootcamp/Example-Todo-list */

import {useState, useEffect} from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MyNavBar from './components/navbar' ;
import UserRegister from './UserRegister' ;
import UserLogin from './UserLogin' ;
import Admin from './Admin' ;
import View from './View'
import Add from './Add';
import Footer from './components/footer';
import "./App.css"

function App() {
	// Users state
	const adminUser = {
		username: 'Admin',
		password: 'Admin123', // Who needs cryptographic hash functions or strong passwords?
		imageUrl: 'https://images.unsplash.com/photo-1593486544625-13ef2368e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80',
		bio: 'Administrator Bob - Now officially unremovable'
	} ;
	const [users, changeUsers] = useState({
		0: { ...adminUser }, // (must have ID 0)
	}) ;
	const [nextUserId, changeNextUserId] = useState(1) ;
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

	function removeUser(userId) {
		const removeUserFunc = (users) => {
			const usersNew = {...users}
			delete usersNew[userId] ;
			return usersNew ;
		}
		changeUsers(removeUserFunc) ;
		localStorage.setItem("users", JSON.stringify(removeUserFunc(users))) ;
		if (userId === currentUserId) {
			changeCurrentUserId(null) ;
			localStorage.setItem("currentUserId", null) ;
		}
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
	changeCardDefs(cardDefsNew) ; ///
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

	function handleDislike(postId) {
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
    const users = JSON.parse(localStorage.getItem("users")) || undefined ;
		const cardDefs = JSON.parse(localStorage.getItem("cardDefs")) || undefined ;
		const currentUserId = JSON.parse(localStorage.getItem("currentUserId")) || undefined ;
    initWithData(users, cardDefs, currentUserId) ;
  }, []) ;

	function initWithData(users = {0: { ...adminUser }}, cardDefs = {}, currentUserId = null) {
		changeUsers(users) ;
		changeCurrentUserId(currentUserId) ;
		changeNextUserId(nextIdFromData(users)) ;
		changeCardDefs(cardDefs) ;
		changeNextPostId(nextIdFromData(cardDefs)) ;
	}

	function nextIdFromData(data) {
		return Object.keys(data).reduce((max, id) => Math.max(max, id), -1) + 1 ;
	}

	// Clear everything!
	function clearData() {
		initWithData() ;
		localStorage.clear() ;
	}

	function userLogin(formValues) {
		const userId = getUserId(formValues.username) ;
		const credentialsMatch = (userId !== null && formValues.password === users[userId].password) ; // User exists and passwords match?
		if (credentialsMatch) {
			changeCurrentUserId(userId) ; // Make this the current user if credentials were okay
			localStorage.setItem("currentUserId", JSON.stringify(userId)) ;
		}
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

					{currentUserId === "0" && 
						<Route path="/admin" element={
							<Admin users={users} removeUser={removeUser} clearDB={clearData} />
					} />}
					
 					<Route path="*" element={<Navigate to="/" replace />} />

				</Routes>

			</Container>
			<Footer className="footer"/>
			
		</div>
	);
}
export default App;