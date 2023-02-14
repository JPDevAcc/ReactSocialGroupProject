import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Add(props){
	const formValues = {
		imageUrl: "",
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
		formValues[event.target.name] = event.target.value;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(formValues.imageUrl, formValues.text);
    toastr["success"]("Post added", "Success")
  }

  return (
		<div>
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="imageUrl">
					<Form.Label>Image URL</Form.Label>
					<Form.Control 
						name="imageUrl"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="text">
					<Form.Label>Message</Form.Label>
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
export default Add;
