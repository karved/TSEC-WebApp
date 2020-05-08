import React, { Component } from 'react';
import firebase  from '../../config/firebaseConfig'
import Bell from './img/bell.png'
import Modal from 'react-modal'
import './pe.css'
import Slider from "react-slick";
import Mountain from './img/mountain.png'
import Forest from './img/forest.png'
// #42b078
//there are 2 methods first is using a module, secnd is somewhat similar to what you have done here,letsdo the second one
class Pe extends Component {
   constructor(){
       super()
       this.state = {
           isActive: false,
           title: null ,
           content: null,
           image1: null,
           image2: null,
           image3: null
       }
   }
   componentWillMount(){
       Modal.setAppElement('body');

   }

   toggleModal = (title,content,slider) => {
       this.setState({
           isActive: !this.state.isActive,
           title: title,
           content: content,
          slider: slider
       })
   }
    state = {
       pastevents: null
      }
      componentDidMount()
      {
        //   db.collection('pastevents')
        //   .get()
        //   .then(snapshot => {
        //       const pastevents = []
        //     snapshot.forEach(doc => {
        //         const data = doc.data()
        //         pastevents.push(data)
        //     })
        //     this.setState({pastevents: pastevents})
        //     })
        //     .catch(error => console.log(error))


//Object.keys(objName).length


        firebase.database().ref('test/website/home/pastevents').once('value')
            .then( (snapshot) => {
                if (snapshot.val()){
                    this.setState({pastevents: (snapshot.val())})
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
      
        return (<div> <div className=' head1 grey-text darken-4 hide-on-med-and-up'>
         
                    <h4>PAST ACTIVITIES</h4>
        </div>

        <div className='center grey-text darken-4 hide-on-small-only'>
         
                    <h4>PAST ACTIVITIES</h4>
        </div>
        
        
        
        
        <div className='row'> 
            {this.state.pastevents && Object.keys(this.state.pastevents
            ).map( key => {
                var title = this.state.pastevents[key].title;
       var content = this.state.pastevents[key].content;
var slider = this.state.pastevents[key].slider;
                return (<div className='hov'>
                  <div className='col colpa'>
                      <img  className='ima  hoverable' src={this.state.pastevents[key].image} />
                      <div className='center'>
                            
<button type="button" className="button btn btn-primary but" onClick={() => this.toggleModal(title,content,slider)}>

                                {this.state.pastevents[key].title}
</button>
<Modal isOpen={this.state.isActive} 
onRequestClose={() => this.toggleModal(title,content,slider)} 
id={this.state.pastevents[key].title}>
<br />
    <button type='button' className='right' onClick={() => this.toggleModal(title,content,slider)}><i className="small material-icons" >close</i></button>
     <br/><br/> <p className='title center'>{this.state.title}</p>
        <br/><div className='row'><div className="sliderr center col-md-4"> <Slider {...settings}>
       {this.state.slider && Object.keys(this.state.slider
            ).map(key => { return(<img className='sliderimage' src={this.state.slider[key].url} />) })}</Slider> </div> 
       <div className='col-md-8'> <p className='contented center'>{this.state.content}</p></div></div><br/><br/>
        
       </Modal>
                            {/* <div className="mod modal fade" id="myModal" >
                                <div className="dialog modal-dialog">
                                    <div className="modal-content">
                                      
                                        <div className="contentt modal-body">
                                            <div className="pop center-align"><strong className='w-50'>{this.state.pastevents[key].title}</strong><i className="small right material-icons" data-dismiss="modal">close</i><br/><br/>
                                                <div className="sliderr"> <Slider {...settings}> <img src={this.state.pastevents[key].image} /> <img src={this.state.pastevents[key].image} /></Slider></div>  <br/>  {this.state.pastevents[key].content}<br/>
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

           {/* {this.state.pastevents && this.state.pastevents.map(
               pastevents => { return (<div className='hov'>
                  <div className='col'>
                      <img  className='ima center' src={pastevents.image} />
                      <div className='center'>
                          <strong>{pastevents.title}</strong>
                      </div>
                      </div>
                   </div>
               )} */}
           {/* )} */}
           </div>
         </div>
        );
    }
}
 
export default Pe;