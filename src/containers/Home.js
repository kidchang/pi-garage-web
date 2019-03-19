import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      doors: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const doors = await this.doors();
      this.setState({ doors });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  doors() {
    return API.get("doors", "/doors");
  }


  renderDoorsList(doors) {
    console.log(doors);
    return [{}].concat(doors).map(
      (door, i) =>
        i !== 0
          ? <LinkContainer
              key={door.doorId}
              to={`/doors/${door.doorId}`}
            >
              <ListGroupItem header={door.doorName.trim().split("\n")[0]}>
                {"Created: " + new Date(door.createdAt).toLocaleString() + "\n"}
                {"Status: " + door.doorStatus.toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/doors/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Add a new door
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }


  renderLander() {
    return (
      <div className="lander">
        <h1>Garage Door Control</h1>
        <p>Control your garage door from the Cloud.</p>
      </div>
    );
  }

  renderDoors() {
    return (
      <div className="door">
        <PageHeader>Garage Doors</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderDoorsList(this.state.doors)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderDoors() : this.renderLander()}
      </div>
    );
  }
}
