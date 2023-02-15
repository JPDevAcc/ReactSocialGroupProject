import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function UserRegister(props) {
	const formValues = {
		username: "",
		imageUrl: "",
		bio: ""
	}

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  const handleChange = (event) => {
		formValues[event.target.name] = event.target.value;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({...formValues});
		toastr["success"]("User Created", "Success")
  }

  return (
		<div>
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control 
						name="username"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="imageUrl">
					<Form.Label>Image URL</Form.Label>
					<Form.Control 
						name="imageUrl"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="bio">
					<Form.Label>Bio</Form.Label>
					<Form.Control 
						name="bio"
						as="textarea"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				
				<Button variant="primary" type="submit">
					Create User
				</Button>
			</Form>
		</div>
  );
}