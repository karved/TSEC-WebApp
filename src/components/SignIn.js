import React, { Component } from "react";
import { TextInput, Button, CardPanel } from "react-materialize";
import { signin } from "./../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavSign from "./NavSign";
import M from "materialize-css";
import "../components/SignIn/SignIn.css";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signin(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/landing" />;

    return (
      <div>
        <NavSign />
        <div className="container  black-text">
          <br />
          <CardPanel className="cad">
            <form>
              <h6 className="section">Sign In</h6>
              <TextInput
                email
                validate
                id="email"
                label="Email"
                onChange={this.handleChange}
              />
              <TextInput
                password
                id="password"
                label="Password"
                onChange={this.handleChange}
              />
              <Button
                className="left"
                waves="purple"
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>

              <Link to="/forgotpass" className="right" >
                Reset Password?
              </Link>
            </form>
          </CardPanel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  state.auth.authError && M.toast({ html: "Login Failed" });
  {
    //console.log(state.auth.authError);
  }
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signin: cred => {
      dispatch(signin(cred));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
