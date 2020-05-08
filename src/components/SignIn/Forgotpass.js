import React, { Component } from "react";
import { TextInput, Button, CardPanel } from "react-materialize";
import { forgotpass } from "../../store/actions/authActions";
import { connect } from "react-redux";
import NavSign from "../NavSign";
import M from "materialize-css";
import "./SignIn.css";
import { Link } from "react-router-dom";
class Forgotpass extends Component {
  state = {
    email: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.forgotpass(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div>
        <NavSign />
        <div className="container  black-text">
          <br />
          <CardPanel className="for">
            <form>
              <h6 className="section">Reset Password</h6>
              <TextInput
                email
                validate
                id="email"
                label="Email"
                onChange={this.handleChange}
              />
              <Button waves="purple" onClick={this.handleSubmit}>
                SUBMIT
              </Button><br />
              <a href="/signin" className="center grey-text" >
                Sign In Now
              </a>
            </form>
          </CardPanel>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  state.auth.resetError &&
    M.toast({ html: "RESET SUCCESS " }) &&
    M.toast({ html: "Check Email" });

  return {
    resetError: state.auth.resetError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotpass: cred => {
      dispatch(forgotpass(cred));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Forgotpass);
