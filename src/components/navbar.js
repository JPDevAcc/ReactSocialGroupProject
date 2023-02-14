import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function MyNavbar() {
	return (
		<div>
			<Navbar bg="light" expand="md">
				<Navbar.Brand>Todo list</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link className="nav-link" to="/">Home</Link>
						<Link className="nav-link" to="/view">View</Link>
						<Link className="nav-link" to="/add">Add</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
