import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import './mentors.css'
// #42b078
class Mentors extends Component {
    state = {
        mentors: null
    }
    componentDidMount() {
        // db.collection('mentors')
        //     .get()
        //     .then(snapshot => {
        //         const mentors = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             mentors.push(data)
        //         })
        //         this.setState({ mentors: mentors })
        //     })
        //     .catch(error => console.log(error))
        firebase.database().ref('test/website/home/mentors').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({mentors: (snapshot.val())})
                }
            })
            .catch( err => {
                //console.log("firebse error", err)
            })
    }
    render() {

        return (<div> <div className=' head3 center grey-text darken-4'>
            <h4>MENTORS</h4>
        </div><div className='row'>
                {this.state.mentors && Object.keys(this.state.mentors).map(
                    key => {
                        return (<div className='hove'>
                            <div className='space row-cols-2'>
                                <img className='imag center hoverable' src={this.state.mentors[key].image} />
                                <div className='spac center'>
                                    <strong>{this.state.mentors[key].type}</strong><br />
                                    {this.state.mentors[key].name}<br/>
                                    {this.state.mentors[key].profession}<br/>
                                    {this.state.mentors[key].prof}
                                
                                </div>
                            </div>
                            <br></br>
                        </div>
                        )
                    }
                )}</div>
        </div>
    
    );
  }
}

export default Mentors;
