import React from "react";
import "./App.css";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Axios from "axios";
function App() {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState();
  const checkParentheses = () => {
    let request = {
      code: document.getElementById("code").value,
    };
    Axios.post("http://localhost:3001/test/checkbrackets", request)
      .then((data) => {
        if (data.data.valid==true){
          setSuccess(true)
          setError(false);
        }else{
          setError(true)
          setSuccess(false);
        }
        setResponse(data.data.errorMsg);
        console.log(data.data);
      })
  };
  return (
    <div>
      <header className="App-header">Parentheses Check test</header>

      <div>
        <label>Write code:</label>
      </div>
      <textarea
        class="mdc-text-field__input"
        rows="8"
        cols="40"
        aria-label="Label"
        id="code"
      ></textarea>

      <div>
        <Button variant="contained" color="primary" onClick={checkParentheses}>
          Primary
        </Button>
      </div>
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <Collapse in={success}>
        <Alert severity="success">Parentheses close properly</Alert>
      </Collapse>
      <Collapse in={error}>
        <Alert severity="error">{response}</Alert>
      </Collapse>
    </div>
  );
}

export default App;
