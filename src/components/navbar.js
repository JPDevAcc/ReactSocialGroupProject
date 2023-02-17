import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import "./navbar.css"
import { useNavigate } from "react-router-dom";

export default function MyNavbar(props) {
	const navigate = useNavigate();
	function toAdminPage() {
		navigate("/admin")
	}
	return (
		<div>
			<Navbar bg="dark" expand="md">
				<Navbar.Brand className="nav1">React Social Media Project </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link" to="/">Login</Link>
						<Link className="nav-link" to="/register">Register</Link>
						<Link className={props.username ? 'nav-link' : 'd-none'} to="/view">View Posts</Link>
						<Link className={props.username ? 'nav-link' : 'd-none'} to="/add">Add Post</Link>
					</Nav>
					<div className="d-flex">
						{props.username && <div className="me-4 align-self-center navbar-username">Logged in as: <Link to="/profile/current"><b>{props.username}</b></Link></div>}
						{props.username && <Button onClick={props.userLogout} className="me-2 logout-btn">Log out</Button>}
						{(props.username === 'Admin') && <Button onClick={toAdminPage}>Admin</Button>}
					</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
