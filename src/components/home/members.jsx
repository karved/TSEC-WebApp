import React, { Component } from 'react';
import Bell from './img/bell.png'
import  './members.css'
import Adt from './androiddevelopementteam'
import {Link} from 'react-router-dom'
import Wdt from './webdevelopementteam'
import Mt from './managementteam'
import Gt from './graphicalteam'
import Head from './head'
import Dmt from './databasemanagementteam'
import {Link as L, Button} from 'react-scroll'
class Members extends Component {
    state = {  }
    render() { 
        return (  
           <div className="mem">
           {window.scrollTo(0,0)}
                <div className="navbar-fixed hide-on-small-only">
                    <nav>
                        <div className="nav-wrapper primaryColor ">
                            <div className='container row-cols-2'><ul>
                                <li className='left'><Link to='/'> <i className="material-icons">home</i></Link> </li>
                                <li className='center  brand-logo hide-on-small-only'>MAD Club Core Team</li>
                                </ul>
                            </div>
                        </div>
                        </nav>
                </div>

                <div className="navbar-fixed hide-on-med-and-up">
                    <nav>
                        <div className="nav-wrapper primaryColor ">
                            <div className='container'><ul>
                                <li className='left'><Link to='/'> <i className="material-icons">home</i></Link> </li>
                                <li className='center hide-on-med-and-up'> &nbsp;&nbsp;&nbsp;MAD Club Core Team</li>
                                </ul>
                            </div>
                        </div>
                        </nav>
                </div>

             
                <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Head /></div>

               <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Adt /></div>
                  <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Wdt /></div>
                <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Dmt /></div>
                <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Mt /></div>
                <div id='cont1' className="cont1 shadow-lg hoverable border border-grey"><Gt /></div>
                <L
                    activeClass="active"
                    to="cont111"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                ></L>
           </div>
         
        );
    }
}
 
export default Members;