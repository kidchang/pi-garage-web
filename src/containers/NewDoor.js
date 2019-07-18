import React, { Component } from "react";
import { API } from "aws-amplify";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewDoor.css";

export default class NewDoor extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      doorName: "",
      piUrl: "",
      doorStatus: "closed",
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  validateForm() {
    return this.state.doorName.length > 0 && this.state.piUrl.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createDoor({
        doorName: this.state.doorName,
        doorStatus: this.state.doorStatus,
      });
      this.props.history.push("/");
    } catch (e) {
      alert("Only owners are allowed to create doors.");
      this.setState({ isLoading: false });
      this.props.history.push("/");
    }
  }

  createDoor(door) {
    return API.post("doors", "/doors", {
      body: door
    });
  }


  render() {
    return (
      <div className="NewDoor">
        <div class="jumbotron">
          <h3 class="display-1">Before you submit:</h3>
            <li class="lead">Please make sure your Raspberry Pi is up and running and connected to the internet. </li>
            <li class="lead">Make sure you start the listener script on your Raspberry Pi so that the app will automatically run upon doors created:</li>
            <pre><code>nohup python3 /workspace/command_lister.py --username=$your_username &</code></pre>
        </div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="doorName">
            <ControlLabel>Door Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.doorName}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="piUrl">
            <ControlLabel>Raspberry Pi URL</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.piUrl}
              type="text"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="small"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Submit"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
