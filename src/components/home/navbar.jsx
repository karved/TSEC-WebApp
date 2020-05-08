
import React, { Component } from "react";
import { Link as L } from "react-scroll";
import { Link } from "react-router-dom";
import Bell from "./img/bell.png";
import Logo from "./img/logo.png";
import "./navbar.css";
import { Navbar as N } from "react-materialize";
import { connect } from "react-redux";
import M from "materialize-css";

class Navbar extends Component {
  state = {};
  render() {
    //console.log(this.props);
    const padding = {
      margin: "10px"
    };
    const size = {
      width: "110px",
      height: "60px",
      margin: "0px"
    };

    const { auth } = this.props;
    if (auth.uid) {
      var x = <i className="small material-icons">apps</i>;
    } else {
      var x = "SIGN IN";
    }
    return (
      <div>
        <N fixed alignLinks="left" className="primaryColor">
          <img className="log" src={Logo} style={size} />
          <li>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </li>
          <li>
            <L
              activeClass="active"
              to="cont5"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              HOME
            </L>
          </li>
          <li>
            <L
              activeClass="active"
              to="cont7"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              ABOUT
            </L>
          </li>
          <li>
            <L
              activeClass="active"
              to="cont2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              EVENTS
            </L>
          </li>
          <li>
            {" "}
            <L
              activeClass="active"
              to="cont1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              PAST ACTIVITIES
            </L>
          </li>
          <li>
            <L
              activeClass="active"
              to="cont8"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              PROJECTS
            </L>
          </li>
          <li>
            {" "}
            <L
              activeClass="active"
              to="cont3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              MENTORS
            </L>
          </li>
          <li>
            {" "}
            <L
              activeClass="active"
              to="cont4"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              FOUNDERS
            </L>
          </li>

          
            <li>
              <Link to="/notices">
              <i className="small material-icons">notifications</i>
              </Link>
            </li>
          

          <Link to="/signin">
            {" "}
            <li className="left text-black">{x}</li>
          </Link>
        </N>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)

  state.auth.authError && M.toast({ html: "Login Failed" });

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(Navbar);