import React, { Component } from "react";
import {
  CollapsibleItem,
  CollectionItem,
  Badge,
  Button,
  Modal
} from "react-materialize";
import {
  downloadFile,
  downloadFromLink,
  downloadFileTeacher
} from "../store/actions/storageActions";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import "../notification.css";
import firebase from '../config/firebaseConfig';
class NotNot extends Component {
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
    const { teacherId, data } = this.props;
   

      data.attachmentsUrls.map(url => {
        // return saveAs(url)
        return this.props.downloadFromLink(url);
      });
    }
  ;
  

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
    const badge = {
      // position: "sticky",
      // left: "100px"
    };
    const { data, type, typo,teacherId  } = this.props;
   
    const title = 
     data.message;
    const date =
      type === "public"
        ? data.dateAndTimeStamp
        : new Date(data.dateAndTimeStamp).toDateString();
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
          
          <div>
          
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
          {(data.attachmentsUrls != null) && downloadBtn} <span>&nbsp;&nbsp;&nbsp;</span>
        </div>
      </CollapsibleItem>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: data => dispatch(downloadFile(data)),
    downloadFromLink: url => dispatch(downloadFromLink(url)),
    downloadFileTeacher: data => dispatch(downloadFileTeacher(data))
  };
};

export default connect(null, mapDispatchToProps)(NotNot);
