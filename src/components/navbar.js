import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import "./navbar.css"

export default function MyNavbar(props) {
	return (
		<div>
			<Navbar bg="dark" expand="md">
				<Navbar.Brand className="nav1">Social Cards</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link" to="/">Login</Link>
						<Link className="nav-link" to="/register">Register</Link>
						<Link className={props.username ? 'nav-link' : 'd-none'} to="/view">View</Link>
						<Link className={props.username ? 'nav-link' : 'd-none'} to="/add">Add</Link>
					</Nav>
					<div className="d-flex">
						{props.username && <div className="me-4 align-self-center">Logged in as <b>{props.username}</b></div> }
						<Button onClick={props.userLogout} className="me-2">Log out</Button>
						<Button onClick={props.clearData}>Clear Data</Button>
					</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
