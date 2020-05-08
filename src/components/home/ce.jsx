import React, { Component } from 'react';
import firebase  from '../../config/firebaseConfig'
import Modal from 'react-modal'
import './ce.css'
import Slider from "react-slick";
import Mountain from './img/mountain.png'
import Forest from './img/forest.png'
// #42b078
//there are 2 methods first is using a module, secnd is somewhat similar to what you have done here,letsdo the second one
class Ce extends Component {
   constructor(){
       super()
       this.state = {
           isActive: false,
           title: null ,
           content: null,
           image1: null,
           image2: null,
           image3: null,
           slider: null
       }
   }
   componentWillMount(){
       Modal.setAppElement('body');

   }

   toggleModal = (title,content,image1,image2,slider) => {
     
       this.setState({
           isActive: !this.state.isActive,
           title: title,
           content: content,
           image1: image1,
           image2: image2,
           slider: slider

       })
   }
    state = {
       currentevents: null
      }
      componentDidMount()
      {
        //   db.collection('currentevents')
        //   .get()
        //   .then(snapshot => {
        //       const currentevents = []
        //     snapshot.forEach(doc => {
        //         const data = doc.data()
        //         currentevents.push(data)
        //     })
        //     this.setState({currentevents: currentevents})
        //     })
        //     .catch(error => console.log(error))


//Object.keys(objName).length


        firebase.database().ref('test/website/home/currentevents').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    // console.log('currentevents data', snapshot.val())
                   
                    this.setState({currentevents: (snapshot.val())})
// console.log(this.state.currentevents)
                }
            })
            .catch( err => {
               // console.log("firebse error", err)
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
        if(this.state.currentevents){
            return (<div className='border border-grey'><div> <div className=' head1 center grey-text darken-4'>
              
                    <h4 >CURRENT EVENTS</h4>
            </div><div className='row'>
                    {this.state.currentevents && Object.keys(this.state.currentevents
                    ).map(key => {
                        var title = this.state.currentevents[key].title;
                        var content = this.state.currentevents[key].content;
                        var image1 = Forest;
                        var image2 = Mountain;
                        var slider = this.state.currentevents[key].slider;
                        return (<div className='hov'>
                            <div className='col'>
                                <img className='ima center hoverable' src={this.state.currentevents[key].image} />
                                <div className='center'>

                                    <button type="button" className="button btn btn-primary" onClick={() => this.toggleModal(title, content, image1, image2, slider)}>

                                        {this.state.currentevents[key].title}
                                    </button>
                                    <Modal isOpen={this.state.isActive}
                                        onRequestClose={() => this.toggleModal(title, content, image1, image2, slider)}
                                        id={this.state.currentevents[key].title}>
                                        <button type='button' className='right' onClick={() => this.toggleModal(title, content, image1, image2, slider)}><i className="small material-icons" >close</i></button>
                                        <br /><br /> <p className='title center'>{this.state.title}</p>
                                        <br /><div className='row'><div className="sliderr center col-md-4"> <Slider {...settings}>
                                            {this.state.slider && Object.keys(this.state.slider
                                            ).map(key => { return (<img className='sliderimage' src={this.state.slider[key].url} />) })}
                                        </Slider> <button type="button" className="button btn btn-primar justify-content-center" >
                                                link</button></div>
                                            <div className='col-md-8'> <p className='contented center'>{this.state.content}</p></div></div><br /><br />

                                    </Modal>
                                    {/* <div className="mod modal fade" id="myModal" >
                                <div className="dialog modal-dialog">
                                    <div className="modal-content">
                                      
                                        <div className="contentt modal-body">
                                            <div className="pop center-align"><strong className='w-50'>{this.state.currentevents[key].title}</strong><i className="small right material-icons" data-dismiss="modal">close</i><br/><br/>
                                                <div className="sliderr"> <Slider {...settings}> <img src={this.state.currentevents[key].image} /> <img src={this.state.currentevents[key].image} /></Slider></div>  <br/>  {this.state.currentevents[key].content}<br/>
                                                <button type="button" className="button btn btn-primary center-align" data-toggle="modal" data-target="#myModal">
                               link
</button></div>
                                  </div>
                               
                                    </div>
                                </div>
                            </div> */}

                                </div>
                            </div>
                        </div>
                        )

                    })}

                    {/* {this.state.currentevents && this.state.currentevents.map(
               currentevents => { return (<div className='hov'>
                  <div className='col'>
                      <img  className='ima center' src={currentevents.image} />
                      <div className='center'>
                          <strong>{currentevents.title}</strong>
                      </div>
                      </div>
                   </div>
               )} */}
                    {/* )} */}
                </div>
            </div></div>);
        } else { return(
            null);
        }
       
      
      
    }
}
 
export default Ce;