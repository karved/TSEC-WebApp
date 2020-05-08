import React, { Component } from 'react';
import Navbar from './home/navbar'
import Ce from './home/ce'
import {  Button} from 'react-materialize'
import { NavLink, Link } from 'react-router-dom'
import Pe from './home/pe'
import {Link as  L} from 'react-scroll'
import Footer from './home/footer'
import Mentors from './home/mentors'
import Founders from './home/founders'
import Sliders from './home/slider'
import About from './home/about'
import Aboutwebapp from './home/aboutwebapp'
import Description from './home/description'
class Landings extends Component {


    state = {  }
    render() {

        return ( 
            <div>
              
               <Navbar id='navbar'/>
                {/* <div id='cont51' className="cont51 shadow-lg hoverable"><Aboutwebapp /></div> */}

                <div id='cont5' className="cont5 shadow-lg hoverable"><Sliders /></div>

               <div id='cont7' className="cont7 shadow-lg hoverable border border-grey"><About /></div>
               

                <div id='cont2' className="cont2 shadow-lg hoverable"><Ce /></div>

               <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Pe /></div> 
              <div id='cont8' className="cont8 shadow-lg"><Description /></div> 
              
                <div id='cont3' className="cont3 shadow-lg hoverable border border-grey"><Mentors /></div>
                <div id='cont4' className="cont4 hoverable border border-grey"><Founders /></div>
                <Link to="/members">  <Button waves="light">View More..</Button></Link>
                 <Footer/>
            </div>
         );
    }
}

export default Landings;
