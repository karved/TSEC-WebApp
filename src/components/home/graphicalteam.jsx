import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import Bell from './img/bell.png'
import './head.css'
import Mountain from './img/mountain.png'
import Forest from './img/forest.png'
// #42b078
class Gt extends Component {
    state = {
        graphicalteam: null
    }
    componentDidMount() {
        // db.collection('graphicalteam')
        //     .get()
        //     .then(snapshot => {
        //         const graphicalteam = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             graphicalteam.push(data)
        //         })
        //         this.setState({ graphicalteam: graphicalteam })
        //     })
        //     .catch(error => console.log(error))
         firebase.database().ref('test/website/home/graphicalteam').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({graphicalteam: (snapshot.val())})
                }
            })
            .catch( err => {
                console.log("firebse error", err)
            })
    }
    render() {

        return (<div> <div className=' head20 center grey-text darken-4'>
            <h4 className='he5'>GRAPHICS TEAM</h4>
        </div><div className='row'>
                {this.state.graphicalteam && Object.keys(this.state.graphicalteam).map(
                    key => {
                        return (<div className='hov'>
                            <div className='col colls'>
                                <img className='ima center' src={this.state.graphicalteam[key].image} />
                                <div className='center'>
                                    <strong>{this.state.graphicalteam[key].name}</strong><br />
                          <p>{this.state.graphicalteam[key].year} - {this.state.graphicalteam[key].branch}</p>
                      
                                </div>
                            </div>
                        </div>
                        )
                    }
                )}</div>
        </div>
        );
    }
}

export default Gt;