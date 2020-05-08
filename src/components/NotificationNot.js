import React, { Component } from "react";
import { Collapsible } from "react-materialize";
import NotNot from "./NotNot";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import NavNot from "./NavNot";
import { Redirect } from "react-router-dom";
import firebase from '../config/firebaseConfig';

class NotificationNot extends Component {
  render() {
    

    const { notices, messages } = this.props;
    {window.scrollTo(0,0)};

    return (
      <div>
     
        <NavNot />
        
        <div className="container">
          <Collapsible popout>
            {
              notices &&
              notices.map(notice => (
                <NotNot
                  data={notice.value}
                  type="public"
                  key={notice.key}
                  typo={this.props.typo}
                />
              ))}
            {
              Array.isArray(messages) &&
              messages.map(message => (
                <NotNot
                  profile={this.props.profile}
                  selectedGroup={this.props.selectedGroup}
                  data={message.value}
                 
                  
                  key={message.key}
                  typo={this.props.typo}
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
    notices: state.firebase.ordered.notification,
    
  };
};

export default compose(
  connect(mapStateToProps),

  firebaseConnect(ownprops => {
      //console.log(ownprops);
    const { messages } = ownprops;
    if ( !messages) {
      const fetchUri = `test/notfication`;
      return [
        { path: `${fetchUri}`, orderByChild: ['dateAndTimeStamp','asc'] }
      ];
    }
    return [{ path: "test/notification" }];
  })
)(NotificationNot);
