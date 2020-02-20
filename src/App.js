import React, { Component } from 'react';
import './App.css';
import Logo from './assets/logo.png';
import iconError from './assets/warning.png';
import verified from './assets/verified.png';

// type AppState = {
//   serial: string
//   showError: Boolean
//   showGood: boolean
// }
export default class App extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      serial: '',
      showError: false,
      showGood: false,
    }

  }

  _onChangeInput(event){
    this.setState({serial: event.target.value});
  }
  
  _sendSerial(e){
    var { serial } = this.state;
    serial = (serial||"").toLowerCase().replace(/[^0-9a-z]/gi, '')

    e.preventDefault()
    fetch('https://contact-platform.com/api/device/exists?device=' + serial)
    .then((response) => response.json())
    .then((data) => {
      // 1 =  ; 0 =  ; -1 =  ;
      if (data.code === 0 || data.code === 1){
        this.setState({
          serialContent: serial,
          showError: false,
          showSuccess: true
        });
      }else{
        this.setState({
          serialContent: serial,
          showSuccess: false,
          showError: true
        });
      }
    })
    .catch(error => console.log('error...', error)); 
  }

  render(){
    const { serial, serialContent, showError, showSuccess } = this.state;
    return (
      <div className="container">
        <img src={Logo} className="logo" alt="Logo LPS France"/>
        <form className="formCtn" onSubmit={(e) => this._sendSerial(e)}>
          { 
            showError && 
            <div className="errorCtn red">
              <img src={iconError} className="errorIcon" alt="Error on serial number" />
              <p>This serial number {serialContent.toUpperCase()} does not exist in our platform.<br></br><br></br><a href="mailto:info@lpsfr.com">Contact info@lpsfr.com</a></p>
            </div>
          }
          { 
            showSuccess && 
            <div className="errorCtn green">
              <img src={verified} className="errorIcon" alt="Serial number" />
              <p>This serial number {serialContent.toUpperCase()} is a valid product on our platform.<br></br><br></br><a href="mailto:info@lpsfr.com">Contact info@lpsfr.com</a></p>
            </div>
          }
          <input type="text" value={serial} onChange={(event) => this._onChangeInput(event)} className="inputSerial" placeholder="Enter the serial number"/>
          <input type="submit" value="Verify the product" className="inputSend" />
        </form>

        <p className="copyright">2020 © Lightning Protection Systems France<br></br><a href="https://lightning-protection-systems.com/website/" target="_blank">www.lpsfr.com</a></p>
      </div>
    );
  }
}

