import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function Comments(props) {

  // const handleChange = (event) => {

  //   const [formValues, setFormValues] = useState({
  //     id: 0,
  //     description: "",
  //     completed: false
  //   });

    // console.log(event.target.name)
    // console.log(event.target.value)
    // const newState = {...formValues}

    // if (event.target.name === "completed") {
    //   newState[event.target.name] = !formValues.completed;
    // } else {
    //   newState[event.target.name] = event.target.value;
    // }

    // setFormValues(newState)
  // };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   props.onSubmit(formValues)
  //   toastr["success"]("Todo added", "Success")
  //   setFormValues({
  //     id: 0,
  //     description: "",
  //     completed: false,
  //   })
  // }



  return (
    <div>
        {/* <Form onSubmit={(event) => submitHandler(event)}>
          <Form.Group controlId="taskID">
            <Form.Label>User name</Form.Label>
            <Form.Control 
              name="userName" 
              type="text" 
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>

          <Form.Group controlId="taskDescription">
            <Form.Label> Description</Form.Label>
            <Form.Control 
              name="description" 
              type="text" 
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
      </div>
  );
}