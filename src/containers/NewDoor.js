import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
      doorStatus: "closed",
      piUrl: ""
    };
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
        piUrl: this.state.piUrl
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
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
          <h3 class="display-1">Before you start</h3>
            <li class="lead">Please make sure your Raspberry Pi is up and running and connected to the internet. </li>
            <li class="lead">(First time setup only)You need to connect me to the same WiFi as your Raspberry Pi.</li>
            <li class="lead">Take note of your Raspberry Pi IP address and port on which the garage door app runs.</li>
            <li class="lead">Input the IP address and Port number below. e.g: "http://192.168.1.100:3333"</li>
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
