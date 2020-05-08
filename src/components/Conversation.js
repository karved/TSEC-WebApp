import React, { Component } from "react";
import NotificationList from "./NotificationList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Seencount from "./Seencount";
import Divider from "react-materialize/lib/Divider";

class Conversation extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const { messages } = this.props;

    return (
      <div>

        {window.scrollTo(0,document.body.scrollHeight)}
        <Seencount messages={messages} teacherId={this.props.match.params.id} />
        <NotificationList
          type="private"
          messages={messages}
          teacherId={this.props.match.params.id}
        />
        {messages== null && (
          <div className="card-small center">
            <span><h6><b>No Messages.</b></h6></span>
          </div>
        )}
      </div>
    );
  }
}
//done
const mapStateToProps = (state, ownprops) => {
  const teacherId = ownprops.match.params.id;
  const { profile } = state.firebase;
  let groups = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.groups)
      groups = state.firebase.ordered.test.groups;
  // let { groups } = state.firebase.oredered.test && state.firebase.ordered.test;

  let group = null;
  if (groups) {
    group = groups[profile.branch][profile.year][profile.class][teacherId];
  }
  let messages = null;
  if (group) {
    messages = group.messages;
    if (messages) {
      if (!Array.isArray(messages)) {
        const tempMessages = Object.keys(messages).map(key => {
          return { key: key, value: messages[key] };
        });
        messages = tempMessages;
      }
    }
  }

  return {
    auth: state.firebase.auth,
    profile: profile,
    messages: messages,
    teacherName: group ? group.TeacherName : ""
  };
};

export default connect(mapStateToProps)(Conversation);
