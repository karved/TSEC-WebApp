import React, { Component } from "react";
import { connect } from "react-redux";
import {
  seencountteacher,
  addseenlistteacher
} from "../../store/actions/seenTeacherPrincipalAction";
class IncrementTeacherPrincipal extends Component {
  componentDidMount() {
    if (this.props.data.seenCount === "0") {
      var seenncount = "1";
      this.props.seencountteacher(this.props, seenncount);
      this.props.addseenlistteacher(this.props);
    } else {
      if (
        !Object.keys(this.props.data.seenDetailsList).includes(
          this.props.auth.auth.uid
        )
      ) {
        var seenncount = (parseInt(this.props.data.seenCount) + 1).toString();
        this.props.seencountteacher(this.props, seenncount);
        this.props.addseenlistteacher(this.props);
      }
    }
  }

  render() {
    return <div></div>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    seencountteacher: (props, seenncount) => {
      dispatch(seencountteacher(seenncount, props.data.msgId));
    },
    addseenlistteacher: props => {
      dispatch(
        addseenlistteacher(
          props.data.msgId,
          props.auth.auth.uid,
          props.profile.name,
          props.profile.photo
        )
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(IncrementTeacherPrincipal);
