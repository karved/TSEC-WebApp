import React, { Component } from "react";
import NotificationList1 from "./NotificationList1";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import {
  createTextNotice1,
  createMediaNotice1,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";

class StudNot extends Component {
  state = {
    plainText: "",
    activeTab: "",
    files: [],
    isSubmitClickable: true
  };

  handlePlainTextChange = e => {
    this.setState({
      plainText: e.target.value,
      activeTab: 1
    });
  };
  handleMediaChange = file => {
    const files = this.state.files;
    files.push(file.nativeEvent.srcElement.files);
    this.setState({ files });

    this.setState({
      activeTab: 2
    });
  };
  showRelevantToasts = () => {
    const { noticePushError, noticePushData } = this.props;

    if (noticePushError) M.toast({ html: `Error Pusing ${noticePushData}` });
    else if (!noticePushError && noticePushData)
      M.toast({ html: `Succesfully Pushed ${noticePushData}` });
  };

  handleNoticePush = e => {
    e.preventDefault();

    const { activeTab } = this.state;

    const { plainText } = this.state;

    //check which tab is active and start processing
    switch (activeTab) {
      case 1:
        //plain text

        this.props
          .createTextNotice1({
            uid: this.props.auth.uid,
            text: plainText,
            profile: this.props.profile,
            msgType: "Text"
          })
          .then(() => {
            // this.props.clearNoticeData()
            this.showRelevantToasts();
            this.setState({ isSubmitClickable: true, plainText: "" });
            document.getElementById("myForm").reset();
          });

        return;

      case 2:
        //media
        var x = document.getElementById("loader");
        if (x.style.display === "none") {
          x.style.display = "block";
        }
        const { files } = this.state;
        this.setState({ isSubmitClickable: false });

        files.forEach(file => {
          //create notice for each file

          this.props
            .createMediaNotice1({
              // group: classgroups[this.props.location.state.selectedClass].value,
              uid: this.props.auth.uid,
              file: file[0],
              profile: this.props.profile,
              msgType: "media"
            })
            .then(() => {
              this.showRelevantToasts();

              const newFiles = this.state.files.filter(f => {
                if (f.name !== file.name) return true;
                return false;
              });

              const isSubmitClickable = newFiles.length === 0 ? true : false;
              this.setState({ files: newFiles, isSubmitClickable });

              document.getElementById("myForm").reset();
              if (x.style.display === "block") {
                x.style.display = "none";
              }
            });
        });

        return;

      default:
        return;
    }
  };

  render() {
    const { auth, messages } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const style = {display:'none'};
    return (
      //date done
      // can u wait for 2 mins
      // input functions daalke dekhte hai chalta hai ya nahi //k
      <div>
      {window.scrollTo(0,document.body.scrollHeight)}
        {/*<h5 className="container section">Messages</h5>*/}
        <NotificationList1
          type="private"
          messages={messages}
          teacherId={auth.uid}
          typo={this.props.profile.type}
        />

        <form id="myForm">
          <div className="container center">
            <div className="input-field col s12">
              <i className="material-icons prefix icon-primaryColor">mode_edit</i>
              <textarea
                id="icon_prefix2"
                className="materialize-textarea"
                onChange={this.handlePlainTextChange}
              ></textarea>
              <label for="icon_prefix2">Message</label>
            </div>
          </div>
          <div className="container center">
            <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input type="file" multiple onChange={this.handleMediaChange} />
              </div>
              <div class="file-path-wrapper">
                <input
                  class="file-path validate"
                  type="text"
                  placeholder="Upload one file"
                />
              </div>
            </div>
          </div>
          <div className="center">
          <div id="loader" style={style}>
                          <div class="preloader-wrapper small active">
                              <div class="spinner-layer ">
                              <div class="circle-clipper left">
                            <div class="circle"></div>
                                </div><div class="gap-patch">
                               <div class="circle"></div>
                                  </div><div class="circle-clipper right">
                               <div class="circle"></div>
                    </div>
                  </div>
                </div>
                </div>
            <Button waves="purple" onClick={this.handleNoticePush}>PUSH NOTICE</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const teacherId = state.firebase.auth.uid;

  let principal = null;

  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.principal)
      principal = state.firebase.ordered.test.principal;

  let messages = null;
  if (principal)
    if (principal.Students)
      if (principal.Students.messages) {
        messages = principal.Students.messages;
      }

  return {
    auth: state.firebase.auth,
    messages: messages,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTextNotice1: data => dispatch(createTextNotice1(data)),
    createMediaNotice1: data => dispatch(createMediaNotice1(data)),
    createRichNotice: data => dispatch(createRichNotice(data)),
    clearNoticeData: () => dispatch(clearNoticeData())
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(ownprops => {
    const teacherID = ownprops.auth.uid;

    const fetchUri = `/test/principal/Students/messages`;

    return {
      path: fetchUri
    };
  })
)(StudNot);
