import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationBar from "../NavigationBar";
import { createOfficeNotice } from "../../store/actions/officeNoticeAction";
class CreateOfficeNotice extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    let { uid, profile } = this.props;
    const { title, content } = this.state;
    this.props.createOfficeNotice({
      uid: uid,
      title: title,
      content: content,
      profile: profile
    });
  };
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <form onSubmit={this.handleSubmit} className="White">
            <h5 className="blue-text text-lighten-1">UPCOMING OFFICE POST</h5>
            <div className="input-feild">
              <label htmlFor="title">TITLE</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-feild">
              <label htmlFor="content">CONTENT</label>
              <textarea
                className="materialize-textarea"
                id="content"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="input-feild">
              <button className="btn indigo darken-4 z-depth-0">ADD</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    noticePushError: state.notice.noticePushError,
    noticePushData: state.notice.noticePushData,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createOfficeNotice: data => dispatch(createOfficeNotice(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfficeNotice);
