import React, { Component } from "react";
import firebase from "../../config/firebaseConfig";
import Bell from "./img/bell.png";
import "./head.css";
import Mountain from "./img/mountain.png";
import Forest from "./img/forest.png";
// #42b078
class Dmt extends Component {
    state = {
        databasemanagementteam: null
    }
    componentDidMount() {
        //   db.collection('androiddevelopementteam')
        //   .get()
        //   .then(snapshot => {
        //       const androiddevelopementteam = []
        //     snapshot.forEach(doc => {
        //         const data = doc.data()
        //         androiddevelopementteam.push(data)
        //     })
        //     this.setState({androiddevelopementteam: androiddevelopementteam})
        //     })
        //     .catch(error => console.log(error))
        firebase.database().ref('test/website/home/databasemanagementteam').once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                   
                    this.setState({ databasemanagementteam: (snapshot.val()) })
                   
                }
            })
            .catch(err => {
                //console.log("firebse error", err)
            })
    }
    render() {

        return (<div> 
            <div className=' head20 center grey-text darken-4'>
                <h4 className='he5'>DATABASE TEAM</h4>
        </div>
        <div className="row">
          {this.state.databasemanagementteam &&
            Object.keys(this.state.databasemanagementteam).map(key => {
              return (
                <div className="hov">
                  <div className="col colls">
                    <img
                      className="ima center hoverable"
                      src={this.state.databasemanagementteam[key].image}
                    />
                    <div className="center">
                      <strong>
                        {this.state.databasemanagementteam[key].name}
                      </strong>
                      <br />
                      <p>
                        {this.state.databasemanagementteam[key].year} -{" "}
                        {this.state.databasemanagementteam[key].branch}
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

export default Dmt;
