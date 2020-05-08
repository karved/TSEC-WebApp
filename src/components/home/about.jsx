import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import  './about.css'
import Lowerquote from './img/lowerquote.png'
import Upperquote from './img/upperquote.png'

class About extends Component {
    state = { 
        about: null
     }
    componentDidMount() {
        // db.collection('about')
        //     .get()
        //     .then(snapshot => {
        //         const about = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             about.push(data)
        //         })
        //         this.setState({ about: about })
        //     })
        //     .catch(error => console.log(error))
         firebase.database().ref('test/website/home/about').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                   
                    this.setState({about: (snapshot.val())})

                }
            })
            .catch( err => {
                //console.log("firebse error", err)
            })
    }
    render() { 
        return ( 
            <div>
                <div className=' head2 center grey-text'>
                    
                    <h4 >WHAT IS MAD CLUB ?</h4>
                </div>
                <div className='row'>
                    {this.state.about && Object.keys(this.state.about).map(
                        key => {
                            return (<div className='hov'>
                                <div className='col'>
                                   
                                    <div className='center'>
                                       
                                        <p className="content text-dark">
                                            
                                            <div className="hide-on-small-only set1">
                                            <img className='upperquote' src={Upperquote} />&nbsp;&nbsp;
                                            {this.state.about[key].content}&nbsp;&nbsp;&nbsp;
                                            <img className='lowerquote'src={Lowerquote} />
                                            </div>
                                            
                                            <div className="hide-on-med-and-up set2">
                                            <img className='upperquote' src={Upperquote} /> &nbsp;&nbsp;
                                            {this.state.about[key].content}&nbsp;&nbsp;&nbsp;
                                            <img className='lowerquote'src={Lowerquote} />
                                            </div>
                                            


                                            </p>
                                            
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    )}</div> </div>
         );
    }
}

export default About;
