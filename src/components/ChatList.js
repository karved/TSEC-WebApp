import React, { Component } from "react";
import { Collection } from "react-materialize";
import Chat from "./Chat";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class ChatList extends Component {
  render() {
    const { auth, groups } = this.props;
    
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        <NavigationBar />

        <div className="container">
          <h6 className="section black-text">Messages</h6>
          <Collection>
            {Array.isArray(groups) &&
              groups.map(group => (
                <Link to={`/chat/${group.key}`} key={group.key}>
                  <Chat groupData={group.value} />
                </Link>
              ))}
          </Collection>
          {groups== null && (
          <div className="card-small center black-text">
            <span><h6><b>Teachers have not sent any Messages recently.</b></h6></span>
          </div>
        )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profile, auth } = state.firebase;
 
  let groups = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.groups)
      groups = state.firebase.ordered.test.groups;

  return {
    auth: auth,
    profile: auth ? profile : null,
    groups:
      groups && profile
        ? state.firebase.ordered.test.groups[profile.branch][profile.year][
            profile.class
          ]
        : null
  };
};
export default compose(
  connect(mapStateToProps),
  firebaseConnect(state => {
    const profile = state.profile;
    const fetchUri = profile
      ? `/test/groups/${profile.branch}/${profile.year}/${profile.class}`
      : null;

    return [{ path: fetchUri }];
  })
)(ChatList);
