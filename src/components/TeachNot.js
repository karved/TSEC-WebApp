import React, { Component } from "react";
import NotificationList2 from "./NotificationList2";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import NavigationBar from "./NavigationBar";
import {
  createTextNotice2,
  createMediaNotice2,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";

class TeachNot extends Component {
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
          .createTextNotice2({
            uid: this.props.auth.uid,
            text: plainText,
            profile: this.props.profile, //idhar bhi object chahiye ya kuch change ??
            msgType: "Text"
          })
          .then(() => {
            // this.props.clearNoticeData()
            this.showRelevantToasts();
            this.setState({ isSubmitClickable: true, plainText: "" }); // ye dekh  // to ye code run nahi hua rahega // hota hai neeche wala console.log

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
            .createMediaNotice2({
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

      
      <div>
        {window.scrollTo(0,document.body.scrollHeight)}
      
        {/*<h5 className="container section">Messages</h5>*/}
        <NotificationList2
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
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" multiple onChange={this.handleMediaChange} />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
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
            <Button waves="purple"  onClick={this.handleNoticePush}>PUSH NOTICE</Button>
          </div>
        </form>
             
        
      

      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  
  let principal = null;

  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.principal)
      principal = state.firebase.ordered.test.principal;

  let messages = null;
  if (principal)
    if (principal.Teachers)
      if (principal.Teachers.messages) {
        messages = principal.Teachers.messages;
      }

  return {
    auth: state.firebase.auth,
    messages: messages,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTextNotice2: data => dispatch(createTextNotice2(data)),
    createMediaNotice2: data => dispatch(createMediaNotice2(data)),
    createRichNotice: data => dispatch(createRichNotice(data)),
    clearNoticeData: () => dispatch(clearNoticeData())
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(ownprops => {
    const teacherID = ownprops.auth.uid;
    const fetchUri = `/test/principal/Teachers/messages`;

    return {
      path: fetchUri
    };
  })
)(TeachNot);
