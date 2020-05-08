import React, { Component } from "react";
import firebase from "../../config/firebaseConfig";
import Bell from "./img/bell.png";
import "./ce.css";
import Mountain from "./img/mountain.png";
import Forest from "./img/forest.png";
// #42b078
class Wdt extends Component {
  state = {
    webdevelopementteam: null
  };
  componentDidMount() {
    // db.collection('webdevelopementteam')
    //     .get()
    //     .then(snapshot => {
    //         const webdevelopementteam = []
    //         snapshot.forEach(doc => {
    //             const data = doc.data()
    //             webdevelopementteam.push(data)
    //         })
    //         this.setState({ webdevelopementteam: webdevelopementteam })
    //     })
    //     .catch(error => console.log(error))
    firebase
      .database()
      .ref("test/website/home/webdevelopementteam")
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          //console.log("webdevelopementteam data", snapshot.val());
          //console.log("currentta", Object.keys(snapshot.val()));
          this.setState({ webdevelopementteam: snapshot.val() });
          //console.log(this.state.webdevelopementteam);
        }
      })
      .catch(err => {
        console.log("firebse error", err);
      });
  }
  render() {
    return (
      <div>
        {" "}
        <div className=" head20 center grey-text darken-4">
          <h4 className="he5">WEB DEVELOPEMENT TEAM</h4>
        </div>
        <div className="row">
          {this.state.webdevelopementteam &&
            Object.keys(this.state.webdevelopementteam).map(key => {
              return (
                <div className="hov">
                  <div className="col colls1">
                    <img
                      className="ima center"
                      src={this.state.webdevelopementteam[key].image}
                    />
                    <div className="center">
                      <strong>
                        {this.state.webdevelopementteam[key].name}
                      </strong>
                      <br />
                      <p>
                        {this.state.webdevelopementteam[key].year} -{" "}
                        {this.state.webdevelopementteam[key].branch}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Wdt;
