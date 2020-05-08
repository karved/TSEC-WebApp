import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import Bell from './img/bell.png'
import './ce.css'
import Mountain from './img/mountain.png'
import Forest from './img/forest.png'
// #42b078
class Mt extends Component {
    state = {
        managementteam: null
    }
    componentDidMount() {
        // db.collection('managementteam')
        //     .get()
        //     .then(snapshot => {
        //         const managementteam = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             managementteam.push(data)
        //         })
        //         this.setState({ managementteam: managementteam })
        //     })
        //     .catch(error => console.log(error))
         firebase.database().ref('test/website/home/managementteam').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({managementteam: (snapshot.val())})
                }
            })
            .catch( err => {
                console.log("firebse error", err)
            })
    }
    render() {

        return (<div> <div className=' head20 center grey-text darken-4'>
            <h4 className='he5'>MANAGEMENT TEAM</h4>
        </div><div className='row'>
                {this.state.managementteam && Object.keys(this.state.managementteam).map(
                    key => {
                        return (<div className='hov'>
                            <div className='col colls1'>
                                <img className='ima center' src={this.state.managementteam[key].image} />
                                <div className='center'>
                                    <strong>{this.state.managementteam[key].name}</strong><br />
                          <p>{this.state.managementteam[key].year} - {this.state.managementteam[key].branch}</p>
                      
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

export default Mt;