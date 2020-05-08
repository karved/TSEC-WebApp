import React, { Component } from "react";
import { CollapsibleItem, Badge, Button, Modal } from "react-materialize";
import {
  downloadFile1,
  downloadFromLink
} from "../store/actions/storageActions";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import firebase from '../config/firebaseConfig';
import "../notification.css";

class Notification1 extends Component {
  constructor(props) {
    super(props);

    let editorState;
    if (props.data.msgType === "rich") {
      const rawContent = JSON.parse(props.data.msg);
      editorState = EditorState.createWithContent(convertFromRaw(rawContent));
    } else editorState = EditorState.createEmpty();

    this.state = {
      activeKey: "",
      editorState
    };
  }

  handleDownloadAttachment = () => {
   // console.log("starting download...");
    const { teacherId, data } = this.props;

    if (this.props.type !== "public") {
      this.props.downloadFile1({ teacherId, fileName: data.msg });
    } else {
      data.attachmentsUrls.map(url => {
        // return saveAs(url)
        return this.props.downloadFromLink(url);
      });
    }
  };
  handleDelete = () => {
    const { teacherId, data } = this.props;
    return firebase.database().ref('/test/principal/Students/messages').child(data.msgId).remove()

    
  };

  handleSelect = key => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(key);
    }
    if (this.state.activeKey === key) {
      key = null;
    }
    if (this.props.accordion) {
      this.setState({ activeKey: key });
    }
  };

  render() {
    const { data, type,typo } = this.props;
    const title =
      type === "public"
        ? data.title
        : data.msgType === "rich"
        ? "[RICH TEXT DATA]"
        : data.msg;
    const content = type === "public" ? data.message : "";
    const date =
      type === "public"
        ? data.dateAndTimeStamp
        : new Date(data.receiveTimestamp).toDateString();
    const msgType = type === "public" ? undefined : data.msgType;
    const icon =
      data.attachmentsUrls || msgType === "media"
        ? "attachment"
        : data.msgType === "rich"
        ? "description"
        : "textsms";

    const downloadBtn = (
      <Button waves="purple" onClick={this.handleDownloadAttachment}>
        Download Attachments
      </Button>
    );
    const delBtn= (
      <Button className="red" onClick={this.handleDelete}>
      <i class=" large material-icons">delete</i>
      </Button>
    );
    const triggerModal = <Button waves="light">open document</Button>;

    const openRichText = (
      <Modal
        id="richTextModal"
        fixedFooter
        bottomSheet
        header="Rich Text"
        trigger={triggerModal}
      >
        <Editor
          toolbarHidden
          readOnly
          editorState={this.state.editorState}
          onEditorStateChange={editorState => {
            this.setState({ editorState });
          }}
        />
      </Modal>
    );

    return (
      <CollapsibleItem
        onSelect={this.handleSelect}
        header={
          
          <div >
          
            <div className=" left black-text mess"> <i className="material-icons prefix icon-primaryColor">{icon}</i><br />
            {title
                .split("\n")
                .reduce(
                  (ns, x, i, xs) =>
                    i === xs.length - 1 ? [...ns, x] : [...ns, x, <br />],
                  []
                )
                .flatMap(s =>
                    typeof s !== "string" ? [s] :
                s.split(
                    /* https://github.com/sindresorhus/linkify-urls/blob/62fd87c59d61eb8d15530e4d38dbc99abdef78b6/index.js#L5 */
                    /((?<!\+)(?:https?(?::\/\/))(?:www\.)?(?:[a-zA-Z\d-.]+(?:(?:\.|@)[a-zA-Z\d]{2,})|localhost)(?:(?:[-a-zA-Z\d:%+.~#!?&//=@]*)(?:[,](?![\s]))*)*)/g
                  )
                  .map((s, i) => (i % 2 === 0 ? s : <a target="_blank" href={s}>{s}</a>)))}
                
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div><br />
                <div className="header">
                <p>
                <Badge className="left grey-text">{date}</Badge>
              </p>

      
                
              </div>
            </div>
         
        }
      >
      <div className="center container">
          {(msgType === "media") && downloadBtn} <span>&nbsp;&nbsp;&nbsp;</span>
          {(typo === "principal")&& delBtn}
          
        </div>
      </CollapsibleItem>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile1: data => dispatch(downloadFile1(data)),
    downloadFromLink: url => dispatch(downloadFromLink(url))
  };
};

export default connect(null, mapDispatchToProps)(Notification1);
