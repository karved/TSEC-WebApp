import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Navbar } from "react-materialize";
import firebase from "firebase";

class SignedInLinks extends Component  {
 state ={};
  unsub = () => {
//   if(this.props.profile.type == "teacher"){

                          
//     const messaging = firebase.messaging();
//     var topic="test-"+"Teachers";
          
//     messaging.requestPermission()
//     .then(function(){
//         console.log("Success")
//         return messaging.getToken();
//     })
//     .then(function(token){
//       firebase.functions()
//       .httpsCallable('testUnSubscribeToTopic')({ token, topic })
//       .then(console.log)
//       .catch(console.error);
//     })
//     .catch(function(err){
//         console.log("Fail");
//     })}

//     if(this.props.profile.type == "student"){
          
//       const messaging = firebase.messaging();
//       var topic="test-"+"Students";
            
//       messaging.requestPermission()
//       .then(function(){
//           console.log("Success")
//           return messaging.getToken();
//       })
//       .then(function(token){
//         firebase.functions()
//         .httpsCallable('testUnSubscribeToTopic')({ token, topic })
//         .then(console.log)
//         .catch(console.error);
//       })
//       .catch(function(err){
//           console.log("Fail");
//       })

//       // ----------------------------------------------------------

//       var department = this.props.profile.branch;
//       var year =this.props.profile.year;
//       var cls =this.props.profile.class;
//       var topic2="test-"+year+"-"+department+"-"+cls;
//       console.log(topic2);
            
//       messaging.requestPermission()
//       .then(function(){
//           console.log("Success")
//           return messaging.getToken();
//       })
//       .then(function(token){
//         firebase.functions()
//         .httpsCallable('testUnSubscribeToTopic')({ token, topic:topic2 })
//         .then(console.log)
//         .catch(console.error);
//       })
//       .catch(function(err){
//           console.log("Fail");
//       })

//       }

    
}
render(){

  const { profile, signout } = this.props;
  const shortname = (Boolean(profile.name) && profile.name.split(" ")) || "! !";

  return (
    <div>
    <div className="navbar-fixed hide-on-small-only">
    <nav className="primaryColor ">
      <div className="container">
        <ul>
          <li className="left">
            <NavLink to="/">
              <i className="material-icons">home</i>
            </NavLink>
          </li>

          <li className="center  brand-logo hide-on-med-and-up">
            <Link to="/landing">{profile.name}</Link>
          </li>

          <Link to="/landing">
            <li className="center  brand-logo hide-on-small-only">
              {profile.name}
            </li>
          </Link>

          <li className="right brand-logo hide-on-med-and-up" onClick={signout}>
            <NavLink to="/"  onClick={this.unsub}>
              Sign Out             
            </NavLink>
          </li>

          <li className="right hide-on-small-only" onClick={signout}>
            <NavLink to="/"  onClick={this.unsub}>
              Sign Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    </div>

    <div className="navbar-fixed hide-on-med-and-up">
    <nav className="primaryColor ">
      <div className="container">
        <ul>
          <li className="left">
            <NavLink to="/">
              <i className="material-icons">home</i>
            </NavLink>
          </li>

          <li className="center  brand-logo hide-on-med-and-up">
            <Link to="/landing">{profile.name}</Link>
          </li>

          <Link to="/landing">
            <li className="center  brand-logo hide-on-small-only">
              {profile.name}
            </li>
          </Link>

          <li className="right brand-logo hide-on-med-and-up" onClick={signout}>
            <NavLink to="/"  onClick={this.unsub}>
              Sign Out
            </NavLink>
          </li>

          <li className="right hide-on-small-only" onClick={signout}>
            <NavLink to="/" onClick={this.unsub}>
              Sign Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    </div>
  );
};
}

export default SignedInLinks;
