import React, { Component } from "react";
import NotificationList from "./NotificationList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import NavigationBar from "./NavigationBar";
import {
  createTextNotice,
  createMediaNotice,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";

class Convo extends Component {
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
  //ye upload ka nahi hai function
  //toh fir kaise upload hoga
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
    //document.getElementById("icon_prefix2").value = ""
    //document.getElementsByClassName("file-path validate").value= null

    const { activeTab } = this.state;

    const { classgroups } = this.props.location.state;
    const { plainText } = this.state;

    //check which tab is active and start processing
    switch (activeTab) {
      case 1:
        //plain text
        this.props
          .createTextNotice({
            group: classgroups[this.props.location.state.selectedClass].value,
            uid: this.props.auth.uid,
            text: plainText,
            profile: this.props.profile, //idhar bhi object chahiye
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
            .createMediaNotice({
              group: classgroups[this.props.location.state.selectedClass].value,
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
    const style = { display: "none" };

    return (
      <div>
        {/*<h5 className="container section">Messages</h5>*/}
        {window.scrollTo(0, document.body.scrollHeight)}
        <NotificationList
          type="private"
          messages={messages}
          profile={this.props.profile}
          selectedGroup={
            this.props.history.location.state.classgroups[
              this.props.history.location.state.selectedClass
            ].value
          }
          typo={this.props.profile.type}
          teacherId={auth.uid}
        />

        <form id="myForm">
          <div className="container center">
            <div className="input-field col s12">
              <i className="material-icons prefix icon-primaryColor">
                mode_edit
              </i>
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
                  </div>
                  <div class="gap-patch">
                    <div class="circle"></div>
                  </div>
                  <div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button waves="purple" onClick={this.handleNoticePush}>PUSH NOTICE</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const teacherId = props.match.params.id;
  let groups = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.groups)
      groups = state.firebase.ordered.test.groups;
 

  // const { groups } = state.firebase.ordered.test;
  const { selectedClass } = props.location.state;
  const { classgroups } = props.location.state;
  const vall = classgroups[selectedClass].value;

  var group = "";
  if (groups)
    if (vall)
      if (groups[vall.branch])
        if (groups[vall.branch][vall.year])
          if (groups[vall.branch][vall.year][vall.div])
            group = groups[vall.branch][vall.year][vall.div][teacherId];

  let messages = null;
  if (group) {
    messages = group.messages;
    if (messages) {
      if (!Array.isArray(messages) && messages) {
        const tempMessages = Object.keys(messages).map(key => {
          return { key: key, value: messages[key] };
        });
        messages = tempMessages;
      }
    }
  }

  return {
    auth: state.firebase.auth,
    messages: messages,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTextNotice: data => dispatch(createTextNotice(data)),
    createMediaNotice: data => dispatch(createMediaNotice(data)),
    createRichNotice: data => dispatch(createRichNotice(data)),
    clearNoticeData: () => dispatch(clearNoticeData())
  };
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  firebaseConnect(ownprops => {
    const selectedClassGrp =
      ownprops.location.state.classgroups[ownprops.location.state.selectedClass]
        .value;

    const teacherID = ownprops.match.params.id;
    const fetchUri = `/test/groups/${selectedClassGrp.branch}/${selectedClassGrp.year}/${selectedClassGrp.div}/${teacherID}/messages`;

    return {
      path: fetchUri
    };
  })
)(Convo);
