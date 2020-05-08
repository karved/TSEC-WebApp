import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import './head.css';
// #42b078
class Head extends Component {
    state = {
        head: null
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
        firebase.database().ref('test/website/home/head').once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    this.setState({ head: (snapshot.val()) })
                }
            })
            .catch(err => {
                //console.log("firebse error", err)
            })
    }
    render() {

        return (<div> <div className=' head2 center grey-text darken-4'>
            <h4 className='he5 center'>HEAD INCHARGE</h4>
        </div><
            div className='row'>
                {this.state.head && Object.keys(this.state.head).map(
                    key => {
                        return (<div className='hov center'>
                            <div className='col colls'>
                                <img className='ima center' src={this.state.head[key].image} />
                                <div className='center'>
                                    <strong>{this.state.head[key].name}</strong><br />
                                    {this.state.head[key].position}<br/>
                                    <p>{this.state.head[key].year}-{this.state.head[key].branch}</p>

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

export default Head;
