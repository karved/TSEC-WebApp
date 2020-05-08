import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig'
import './ce.css'
// #42b078
class Description extends Component {
    state = {
        descriptionwithoutlinks: null,
        descriptionwithlinks: null
    }
    componentDidMount() {
        // db.collection('descriptionwithoutlinks')
        //     .get()
        //     .then(snapshot => {
        //         const descriptionwithoutlinks = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             descriptionwithoutlinks.push(data)
        //         })
        //         this.setState({ descriptionwithoutlinks: descriptionwithoutlinks })
        //     })
        //     .catch(error => console.log(error))
        firebase.database().ref('test/website/home/descriptionwithoutlinks').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({descriptionwithoutlinks: (snapshot.val())})
                }
            })
            .catch( err => {
                //console.log("firebse error", err)
            })
            firebase.database().ref('website_home/descriptionwithlinks').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({descriptionwithlinks: (snapshot.val())})
                }
            })
            .catch( err => {
               // console.log("firebse error", err)
            })
            
    }

    render() {
                return (<div> <div className=' center grey-text darken-4'>
            
                    <h4 >PROJECTS UNDERTAKEN</h4>
        </div>
                    {this.state.descriptionwithlinks && Object.keys(this.state.descriptionwithlinks
                    ).map(key => {

                        return (
                            <div className="desccontain hoverable border border-grey row">
                                <div className="col-md-2">   <img className='descimag hoverable center-on-small-only' src={this.state.descriptionwithlinks[key].image} /></div>
                                <div className="col-md-10"> <p className='name center align-content-center'>{this.state.descriptionwithlinks[key].title}</p> <p className='desccont'>{this.state.descriptionwithlinks[key].content}<a href={this.state.descriptionwithlinks[key].link}>here</a></p></div>
                            </div>
                        )
                    }
                    )}
                {this.state.descriptionwithoutlinks && Object.keys(this.state.descriptionwithoutlinks
            ).map( key => {
                
                return (
                       <div className="desccontain hoverable border border-grey row">
                        <div className="col-md-2">   <img className='descimag hoverable center-on-small-only' src={this.state.descriptionwithoutlinks[key].image}/></div>
                        <div className="col-md-10"> <p className='name center align-content-center'>{this.state.descriptionwithoutlinks[key].title}</p> 
                        <p className='desccont'>
                            <div className="hide-on-large-only	">
                            <h6><b>{this.state.descriptionwithoutlinks[key].content}</b></h6>
                            </div>
                            <div className="hide-on-med-and-down">
                            {this.state.descriptionwithoutlinks[key].content} 
                            </div>
                        </p></div>
</div>
                        )
                    }
                )}
        </div>
        );
    }
}

export default Description;