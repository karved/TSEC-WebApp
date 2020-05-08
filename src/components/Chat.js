import React, { Component } from "react";
import { CollectionItem } from "react-materialize";

class Chat extends Component {
  render() {
    const { image, TeacherName } = this.props.groupData;
    return (
      <div>
        <CollectionItem className="avatar hoverable">
          <img src={image} alt="" className="circle small" />
          <span className="left black-text">{TeacherName}</span>
        </CollectionItem>
      </div>
    );
  }
}

export default Chat;
