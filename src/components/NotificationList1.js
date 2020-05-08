import React, { Component } from "react";
import { Collapsible } from "react-materialize";
import Notification1 from "./Notification1";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import NavigationBar from "./NavigationBar";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import {
  createTextNotice,
  createMediaNotice,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";
class NotificationList1 extends Component {
  render() {
    const { profile } = this.props;
    if (!profile.name) return <Redirect to="/signin" />;

    const { notices, messages, type, teacherId } = this.props;
    {window.scrollTo(0,document.body.scrollHeight)}

    return (
      <div>
        <NavigationBar />
        
        <div className="container">
          <Collapsible popout>
            {!type &&
              notices &&
              notices.map(notice => (
                <Notification1
                  data={notice.value}
                  type="public"
                  key={notice.key}
                  typo={this.props.typo}
                />
              ))}
            {type &&
              Array.isArray(messages) &&
              messages.map(message => (
                <Notification1
                  data={message.value}
                  teacherId={teacherId}
                  type={type}
                  typo={this.props.typo}
                  key={message.key}
                />
              ))}
          </Collapsible>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notices: state.firebase.ordered.notification || [],
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),

  firebaseConnect(ownprops => {
    const { type, messages, profile, teacherId } = ownprops;
    if (type && !messages) {
      const fetchUri = `/test/groups/${profile.branch}/${profile.year}/${profile.class}/${teacherId}`;
      return [
        { path: `${fetchUri}/messages`, orderBy: ["sendTimestamp", "desc"] }
      ];
    }
    return [{ path: "/test/notification" }];
  })
)(NotificationList1);
