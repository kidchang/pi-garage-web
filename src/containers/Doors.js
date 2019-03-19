import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Doors.css";


export default class Doors extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      door: null,
      doorName: "",
      isLoading: null,
      isDeleting: null
    };
  }

  async componentDidMount() {
    try {
      const door = await this.getDoor();
      const { doorName, doorStatus } = door;

      this.setState({
        door,
        doorName,
        doorStatus
      });
    } catch (e) {
      alert(e);
    }
  }

  getDoor() {
    return API.get("doors", `/doors/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.doorName.length > 0;
  }

  getReversedDoorStatus() {
    console.log(this.state.door.doorStatus);
    if (this.state.door.doorStatus == "closed") {
      return "OPEN";
    } else {
      return "CLOSE";
    }
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveDoor(door) {
    return API.put("doors", `/doors/${this.props.match.params.id}`, {
      body: door
    });
  }

  handleSubmit = async event => {

    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      var doorStatus = "";
      if (this.state.door.doorStatus == "closed") {
        doorStatus = "open";
      } else {
        doorStatus = "closed";
      }
      await this.saveDoor({
        doorStatus: doorStatus
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  deleteNote() {
    return API.del("doors", `/doors/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this garage door?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteNote();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }


  render() {
    return (
      <div className="Doors">
        {this.state.door &&
          <form onSubmit={this.handleSubmit}>
            <LoaderButton
              block
              bsStyle="success"
              bsSize="large"
              type="submit"
              isLoading={this.state.isLoading}
              text={this.getReversedDoorStatus()}
              loadingText="Working..."
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }

}
