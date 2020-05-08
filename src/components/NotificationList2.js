import React, { Component } from "react";
import { Collapsible } from "react-materialize";
import Notification2 from "./Notification2";
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
class NotificationList2 extends Component {
  render() {
    const { profile } = this.props;
    if (!profile.name) return <Redirect to="/signin" />;
    const { notices, messages, type, teacherId } = this.props;
    return (
      <div>
        <NavigationBar />
        {window.scrollTo(0,document.body.scrollHeight)}
        <div className="container">
          <Collapsible popout>
            {!type &&
              notices &&
              notices.map(notice => (
                <Notification2
                  data={notice.value}
                  type="public"
                  key={notice.key}
                  typo={this.props.typo}
                />
              ))}
            {type &&
              Array.isArray(messages) &&
              messages.map(message => (
                <Notification2
                  data={message.value}
                  teacherId={teacherId}
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
)(NotificationList2);
