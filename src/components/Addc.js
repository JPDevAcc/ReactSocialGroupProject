import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./socialCards.css"

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Addc(props){
	const formCommValues = {
		name: "",
		text: ""
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
    
		formCommValues[event.target.name] = event.target.value;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(formCommValues.name, formCommValues.text);
    toastr["success"]("Comment added", "Success")
  }

  return (
		<div className="add-comment">
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="name">
					<Form.Label>User Name</Form.Label>
					<Form.Control 
						name="name"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="text">
					<Form.Label>Comment</Form.Label>
					<Form.Control 
						name="text"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
  );

}

