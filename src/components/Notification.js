import React, { Component } from "react";
import {
  CollapsibleItem,
  CollectionItem,
  Modal,
  Badge,
  Button,
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
import firebase from "../config/firebaseConfig";
import "./Notification.css"; 
import Collection from "react-materialize/lib/Collection";



class Notification extends Component {
  constructor(props) {
    super(props);

    let editorState;
    if (props.data.msgType === "rich") {
      const rawContent = JSON.parse(props.data.msg);
      editorState = EditorState.createWithContent(convertFromRaw(rawContent));
    } else editorState = EditorState.createEmpty();

    this.state = {
      activeKey: "",
      editorState,
       name: []
    };
  }

  handleDownloadAttachment = () => {
    const { teacherId, data } = this.props;

    if (this.props.type !== "public") {
      if (
        this.props.profile.type === "teacher" ||
        this.props.profile.type === "principal"
      ) {
        const dataInfo = {
          teacherName: this.props.profile.name,
          group: this.props.selectedGroup,
          filename: data.msg
        };

        this.props.downloadFileTeacher(dataInfo);
      } else {
        this.props.downloadFile({ teacherId, fileName: data.msg });
      }
    } else {
      data.attachmentsUrls.map(url => {
        // return saveAs(url)
        return this.props.downloadFromLink(url);
      });
    }
  };
  handleDelete = () => {
    const { teacherId, data } = this.props;
    const { branch, div, year } = this.props.selectedGroup;
    return firebase
      .database()
      .ref(`/test/groups/${branch}/${year}/${div}/${teacherId}/messages`)
      .child(data.msgId)
      .remove();
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
    
    const badge = {
      // position: "sticky",
      // left: "100px"
    };
    const { data, type, typo, teacherId } = this.props;
    let sd = null;
    if (data) {
      sd = data.seenDetailsList;
      if (sd) {
        if (!Array.isArray(sd) && sd) {
          const tempMessages = Object.keys(sd).map(key => {
            return { key: key, value: sd[key] };
          });
          sd = tempMessages;
        }
      }
    }

    let l=0;
    if(sd)
      l= sd.length
    
   

      var loc = "#" + data.msgId;
     

    const title =
      type === "public"
        ? data.title
        : data.msgType === "rich"
        ? "[RICH TEXT DATA]"
        : data.msg;
    const seencount = data.seenCount;
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
    const delBtn = (
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
          <div className="header2">
           <div >

              {" "}
              <i className="left material-icons prefix icon-primaryColor">{icon}</i>
              <div className="right black-text">
                <p>
                  <a className=" modal-trigger" data-toggle="modal" data-target={loc}><i className="material-icons ">remove_red_eye</i></a>
                  
                  <div id={data.msgId} className="modal modal-fixed-footer">

                  <div className="modal-content">
                  <h5 className="headerr">
                    <div className="left white-text read">Read by</div>
                    <div className="right white-text num"> {l}</div>
                    </h5>
                 
                  <p>
                  <Collection>
                  { (sd && Object.keys(sd
                    ).map( key => {
                          return(
                            <div>
                            <CollectionItem className="avatar hoverable">
                             <img src={sd[key].value.imageUrl} alt="" className="circle small" />
                             <span className="left black-text">{sd[key].value.name}</span>
                            </CollectionItem>
                            </div>
                          )
                      }
                      )
                  )
                }
                </Collection>

                  </p>
              </div>



                  <div className="modal-footer">
                <button data-dismiss="modal" className="modal-close waves-effect waves-purple btn">Close</button>
              
                  </div>
                 </div>
                
                </p>
              </div>
              <br ></br>
              </div>
              
              <div className="left black-text mess">
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
                  .map((s, i) => (i % 2 === 0 ? s : <a target="_blank" href={s}>{s}</a>)))
               }

                <div >

              <p>
                <Badge className="left grey-text">{date}</Badge>
              </p>
              </div>

            </div>
           
            
              </div>
              
           
        
        }
      >
        <div className="center container">
          {msgType === "media" && downloadBtn} <span>&nbsp;&nbsp;&nbsp;</span>
          {(typo === "principal" || typo === "teacher") && delBtn}
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

export default connect(null, mapDispatchToProps)(Notification);
