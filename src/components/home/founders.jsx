import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import Bell from './img/bell.png'
import './founders.css'
import Mountain from './img/mountain.png'
import Forest from './img/forest.png'
// #42b078
class Founders extends Component {
    state = {
        founders: null
    }
    componentDidMount() {
        // db.collection('founders')
        //     .get()
        //     .then(snapshot => {
        //         const founders = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             founders.push(data)
        //         })
        //         this.setState({ founders: founders })
        //     })
        //     .catch(error => console.log(error))
        firebase.database().ref('test/website/home/founders').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({founders: (snapshot.val())})
                }
            })
            .catch( err => {
                console.log("firebse error", err)
            })
    }
    render() {

        return (<div> <div className=' head4 center grey-text darken-4'>
            <h4>FOUNDERS</h4>
        </div><div className='row'>
                {this.state.founders && Object.keys(this.state.founders
            ).map( key => {
                
                return (
                        <div className='hove'>
                            <div className='space row-cols-3'>
                                <img className='imagg hoverable' src={this.state.founders[key].image} />
                                <div className='spacc center'>
                                    {this.state.founders[key].name}<br />
                                    {this.state.founders[key].type}
                                   
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

export default Founders;