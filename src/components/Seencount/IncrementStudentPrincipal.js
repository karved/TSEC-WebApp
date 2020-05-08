import React, { Component } from "react";
import { connect } from "react-redux";
import {
  seencountstudent,
  addseenliststudent
} from "../../store/actions/seenStudentPrincipalAction";
class IncrementStudentPrincipal extends Component {
  componentDidMount() {
    if (this.props.data.seenCount === "0") {
      var seenncount = "1";
      this.props.seencountstudent(this.props, seenncount);
      this.props.addseenliststudent(this.props);
    } else {
      if (
        !Object.keys(this.props.data.seenDetailsList).includes(
          this.props.auth.auth.uid
        )
      ) {
        var seenncount = (parseInt(this.props.data.seenCount) + 1).toString();
        this.props.seencountstudent(this.props, seenncount);
        this.props.addseenliststudent(this.props);
      }
    }
  }

  render() {
    return <div></div>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    seencountstudent: (props, seenncount) => {
      dispatch(seencountstudent(seenncount, props.data.msgId));
    },
    addseenliststudent: props => {
      dispatch(
        addseenliststudent(
          props.data.msgId,
          props.auth.auth.uid,
          props.profile.name,
          props.profile.photo
        )
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(IncrementStudentPrincipal);
