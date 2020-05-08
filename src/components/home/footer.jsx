import "./footer.css";
import Linkedin from "./img/linkedin.png";
import Facebook from "./img/facebook.png";
import Instagram from "./img/instagram.png";
import React, { Component } from "react";
class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="page-footer grey darken-4">
        <div className="footer-copyright">
          <div className="container">
            {" "}
            <div className="address left">
              <div className="">
                Address
                <br />
                <br />
                W, P. G. Kher Marg, 32nd Road, Marg,
                <br />
                Off Linking Rd, TPS III, Bandra West,
                <br />
                Mumbai, Maharashtra 400050
              </div>
            </div>
            <div className="contact left">
              <div className="">
                Contact <br /> <br /> Sagadevan : 8767723231
                <br />
                Dhruv : 9820894602
              </div>
            </div>
            <div className="links right">
              Social Media Links
              <br /> <br />
              <div className="linked">
                <a href="https://www.linkedin.com/in/mad-club-tsec-1a311717b">
                  <img src={Linkedin} />
                </a>
                &nbsp;&nbsp;
                <a href="https://www.facebook.com/madclubtsec">
                  <img src={Facebook} />
                </a>
                &nbsp;&nbsp;
                <a href="https://instagram.com/madclubtsec?igshid=1hjoo33f4kyah">
                  <img src={Instagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;