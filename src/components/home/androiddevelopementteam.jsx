import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig';
import "./ce.css";
// #42b078
class Adt extends Component {
    state = {
       androiddevelopementteam: null
      }
      componentDidMount()
      {
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
          firebase.database().ref('test/website/home/androiddevelopementteam').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    
                    this.setState({androiddevelopementteam: (snapshot.val())})

                }
            })
            .catch( err => {
                //console.log("firebse error", err)
            })
      }
    render() { 
        
        return (<div> <div className=' head20 center grey-text darken-4'>
            <h4 className='he5'>ANDROID DEVELOPEMENT TEAM</h4>
        </div><div className='row'>
           {this.state.androiddevelopementteam && Object.keys(this.state.androiddevelopementteam).map(
               key => { return (<div className='hov'>
                  <div className='col colls1'>
                      <img  className='ima center hoverable' src={this.state.androiddevelopementteam[key].image} />
                      <div className='center'>
                          <strong>{this.state.androiddevelopementteam[key].name}</strong><br />
                          <p>{this.state.androiddevelopementteam[key].year} - {this.state.androiddevelopementteam[key].branch}</p>
                      </div>
                      </div>
                   </div>
               )}
           )}</div>
         </div>
        );
    }
}

export default Adt;
