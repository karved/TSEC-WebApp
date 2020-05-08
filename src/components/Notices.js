import React, { Component } from "react";
import NotificationNot from "./NotificationNot";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import SeenStudentPrincipal from "./Seencount/SeenStudentPrincipal";
import NavigationBar from "./NavigationBar";
import {
  createTextNotice1,
  createMediaNotice1,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";
import firebase from '../config/firebaseConfig';

class Notices extends Component {
  render() {

    const {messages} = this.props;
   
    return (
      <div>
        {/*<h5 className="container section">Messages</h5>*/}
        <NotificationNot
          messages={messages}
         
        />
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  let notification = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.notification)
      notification = state.firebase.ordered.test.notification;

  // let { principal } = state.firebase.ordered.test; //i meant it was looking really bad before you just corrected it

  let messages = null;
    
 
        messages=notification
      
  return {

    
    messages: messages,
   
  };
};
export default compose(
  connect(mapStateToProps),
  firebaseConnect(ownprops => {
    const fetchUri = `test/notification`;

    return {
      path: fetchUri
    };
  })
)(Notices);

