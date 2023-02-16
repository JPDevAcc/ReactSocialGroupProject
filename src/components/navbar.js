import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import "./navbar.css"

export default function MyNavbar(props) {
	return (
		<div>
			<Navbar bg="dark" expand="md">
				<Navbar.Brand className="nav1">Todo list</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link nav1" to="/">Home</Link>
						<Link className="nav-link nav1" to="/register">Register</Link>
						<Link className="nav-link nav1" to="/view">View</Link>
						<Link className="nav-link nav1" to="/add">Add</Link>
					</Nav>
					<div className="d-flex">
						<Button onClick={props.clearData}>Clear Data</Button>
						</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
