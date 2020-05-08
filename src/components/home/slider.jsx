
import React, { Component } from 'react';
import Slider from "react-slick";
import './slider.css'
import firebase from '../../config/firebaseConfig'

class Sliders extends Component {
    state={
         slider : null
    }
     componentDidMount() {
        // db.collection('slider')
        //     .get()
        //     .then(snapshot => {
        //         const slider = []
        //         snapshot.forEach(doc => {
        //             const data = doc.data()
        //             slider.push(data)
        //         })
        //         this.setState({ slider: slider })
        //     })
        //     .catch(error => console.log(error))
         firebase.database().ref('test/website/home/slider').once('value')      //      test/website/home
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({slider: (snapshot.val())})
                }
            })
            .catch( err => {
                console.log("firebse error", err)
            })
    }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      className: 'slides',
    };
    return (
      <div>
       
        <Slider {...settings}>
         {this.state.slider && Object.keys(this.state.slider).map(
                   key => {
                        return (<div><img width = '100%' height = '100%' src={this.state.slider[key].image} className='slide' /></div>
                        )
                    }
                )}
        </Slider>
      </div>
    );
  }
}
export default Sliders