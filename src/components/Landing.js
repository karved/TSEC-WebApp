import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";
import { connect } from "react-redux";
import NavigationBar from "./NavigationBar";
import { Redirect } from "react-router-dom";
import firebase from 'firebase';
import "./Landing.css";

function Landing({ auth, profile }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  
        // if(profile.type == "student"){
          
        //   const messaging = firebase.messaging();
        //   var topic="test-"+"Students";
                
        //   messaging.requestPermission()
        //   .then(function(){
        //       console.log("Success")
        //       return messaging.getToken();
        //   })
        //   .then(function(token){
        //     firebase.functions()
        //     .httpsCallable('testSubscribeToTopic')({ token, topic })
        //     .then(console.log)
        //     .catch(console.error);
        //   })
        //   .catch(function(err){
        //       console.log("Fail");
        //   })

        //   // ----------------------------------------------------------

        //   var department = profile.branch;
	      //   var year =profile.year;
	      //   var cls =profile.class;
        //   var topic2="test-"+year+"-"+department+"-"+cls;
        //   console.log(topic2);
                
        //   messaging.requestPermission()
        //   .then(function(){
        //       console.log("Success")
        //       return messaging.getToken();
        //   })
        //   .then(function(token){
        //     firebase.functions()
        //     .httpsCallable('testSubscribeToTopic')({ token, topic:topic2 })
        //     .then(console.log)
        //     .catch(console.error);
        //   })
        //   .catch(function(err){
        //       console.log("Fail");
        //   })

        //   }

        //   if(profile.type == "teacher"){
          
        //     const messaging = firebase.messaging();
        //     var topic="test-"+"Teachers";
                  
        //     messaging.requestPermission()
        //     .then(function(){
        //         console.log("Success")
        //         return messaging.getToken();
        //     })
        //     .then(function(token){
        //       firebase.functions()
        //       .httpsCallable('testSubscribeToTopic')({ token, topic })
        //       .then(console.log)
        //       .catch(console.error);
        //     })
        //     .catch(function(err){
        //         console.log("Fail");
        //     })
        //   }

  
  const styleBottom = {
    position: "fixed",
    bottom: "0"
  };
  const main = {
    height: "0%"
  };
  const containStyle = {
    marginTop: "5%",
    borderRadius: "10px",
    paddingLeft: "10%"
  };

  const containStyle1 = {
    padding: "40px",
    borderRadius: "10px"
  };
  const size = {
    width: "150px",
    height: "150px",
    margin: "0px"
  };

  return (
    <div>
      <NavigationBar />
      {window.scrollTo(0, 0)}
      <div className="container center grey lighten-3 ">
        <div className="valign-wrapper " style={containStyle}>
          <div className="container center ">

            {/* TEACHER  */}

            {profile.type === "teacher" && (
              <div className="container center row  ">
                <Link to="/tcnotifications">
                  <div class="card-panel small pr">
                    <div class="card-image" style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        notifications_none
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Principal</h6>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/create">
                  <div class="card-panel small tr">
                    <div class="card-image" style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        send
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Broadcast</h6>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/library">
                  <div className="card-panel small pr">
                    <div className="card-image " style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        book
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Library</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* PRINCIPAL */}

            {profile.type === "principal" && (
              <div className="container center row  ">
                <Link to="/notifications1">
                  <div className="card-panel small pr">
                    <div className="card-image center" style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        chat_bubble_outline
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Teachers</h6>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/notifications">
                  <div class="card-panel small tr">
                    <div class="card-image " style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        group
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Students</h6>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/create">
                  <div class="card-panel small pr">
                    <div class="card-image " style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        send
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Class</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* STUDENT */}

            {profile.type === "student" && (

              <div className="container center row  ">
                <Link to="/stnotifications">
                  <div class="card-panel small pr">
                    <div class="card-image" style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        notifications_none
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Principal</h6>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/chats">
                  <div class="card-panel small tr">
                    <div class="card-image " style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        chat_bubble_outline
                      </i>
                      <div className="black-text " style={main}>
                        <h6>Teachers</h6>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/library">
                  <div class="card-panel small pr">
                    <div class="card-image " style={main}>
                      <i className="material-icons prefix icon-primaryColor medium">
                        book
                      </i>
                       <div className="black-text " style={main}>
                        <h6>Library</h6>
                      </div> 
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {profile.type === "committee" && (
              <Link to="/createcommitteenotice">
                {" "}
                <Button className="btn-large indigo darken-3">
                  Create Notice
                </Button>
              </Link>
            )}
            {profile.type === "office" && (
              <Link to="/createofficenotice">
                {" "}
                <Button className="btn-large indigo darken-3">
                  Create Notice
                </Button>
              </Link>
            )}
          </div>
        </div>

        {profile.type === "committee" && (
          <Link to="/committeenotices">
            {" "}
            <Button className="btn-large indigo darken-3">
              Unverified Notice
            </Button>
          </Link>
        )}
        {profile.type === "office" && (
          <Link to="/officenotices">
            {" "}
            <Button className="btn-large indigo darken-3">
              Unverified Notice
            </Button>
          </Link>
        )}
      </div>

      <div className="col s12  valign-wrapper" style={containStyle1}>
        <div className="container center">
          {/* {profile.type === "student" && (
              <Link to="/library">
                {" "}
                <Button className="btn-large indigo darken-4">Library</Button>
              </Link>
            )} */}
          {/* {profile.type === "teacher" && (
              <Link to="/library">
                {" "}
                <Button className="btn-large indigo darken-4">Library</Button>
              </Link>
            )} */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Landing);
