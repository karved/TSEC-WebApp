import React, { Component } from "react";
import { TextInput, Button, CardPanel } from "react-materialize";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { addId } from "../../store/actions/libraryAction";
import LibraryList from "./LibraryList";
import M from "materialize-css";
class Library extends Component {
  state = { id: "" };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmitAddId = e => {
    e.preventDefault();
    var id = document.getElementById("id").value;
    var cid = document.getElementById("cid").value;
    let { uid } = this.props.auth;
    if (id === cid) {
      this.props.addId({
        id: id,
        uid: uid
      });
    } else {
      M.toast({ html: "ID dont Match" });
    }
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!profile.library_id) {
      return (
        <div>
          <NavigationBar />
          <div className="container">
            <br />
            <CardPanel>
              <form>
                <h5 className="black-text text-darken-4">Enter Your Library ID </h5>
              
                <h6 className="red-text">**Note: You can add Library ID only once. </h6>
                <TextInput
                  id="id"
                  label="Eg. M123"
                  onChange={this.handleChange}
                />
                <TextInput id="cid" label="Confirm ID" />
                <Button onClick={this.handleSubmitAddId}>Add</Button>
              </form>
            </CardPanel>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavigationBar />
          <div>
            <LibraryList />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addId: data => dispatch(addId(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
