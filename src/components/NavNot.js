import React, { Component } from "react";
import { Link,NavLink } from "react-router-dom";

class NavNot extends Component {
  render() {
   

    return (  <div>
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
                Notifications
              </li>
    
            
                <li className="center  brand-logo hide-on-small-only">
                  Notifications
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
               <h5>Notifications</h5>
              </li>
    
                <li className="center  brand-logo hide-on-small-only">
                  Notifications
                </li>
      
            </ul>
          </div>
        </nav>
        </div>
        </div>);
  }
}


export default (NavNot);
