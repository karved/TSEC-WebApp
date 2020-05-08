import React, { Component } from "react";
import { connect } from "react-redux";
import { seencount, addseenlist } from "../store/actions/seencountAction";
class IncementSeencount extends Component {
  componentDidMount() {
    if (this.props.data.seenCount === "0") {
      var seenncount = "1";
      this.props.seencount(this.props, seenncount);
      this.props.addseenlist(this.props);
    } else {
      if (
        !Object.keys(this.props.data.seenDetailsList).includes(
          this.props.auth.auth.uid
        )
      ) {
        var seenncount = (parseInt(this.props.data.seenCount) + 1).toString();
        this.props.seencount(this.props, seenncount);
        this.props.addseenlist(this.props);
      }
    }
  }

  render() {
    return <div></div>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    seencount: (props, seenncount) => {
      dispatch(
        seencount(
          seenncount,
          props.profile.branch,
          props.profile.year,
          props.profile.class,
          props.teacherId,
          props.data.msgId
        )
      );
    },
    addseenlist: props => {
      dispatch(
        addseenlist(
          props.profile.branch,
          props.profile.year,
          props.profile.class,
          props.teacherId,
          props.data.msgId,
          props.auth.auth.uid,
          props.profile.name,
          props.profile.photo
        )
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(IncementSeencount);
