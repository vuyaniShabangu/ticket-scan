import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
 
class QRScanner extends Component {
  state = {
    result: ''
  }
 
  handleScan = data => {
    
    if (data) {
        if(!isValidQR(data)){
            code = stripCode(code);
            //code = 
        }
        else{

        }
        data = data.replace("https://moreonlile.co.za?ticket_id=", "");
        data = data.replace("&action=mt-verify","");
      this.setState({
        result: this.isDuplicate(data) ? "Successful Scan" : "DUPLICATE TICKET!!!"
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  isDuplicate = code => {
   let result = false;
   axios.get('https://vome-77efd.firebaseio.com/'+code+'.json')
    .then(function (response) {
        console.log(response.data);
        return false;
    })
    .catch(function (error) {
        console.log(error);
    });
    return true;
  }

  isValidQR = code => {
    if(code)
        return true;
  }

  stripCode = code => {
    return code;
  }

  getRecord = code => {
      return code;
  }

  postRecord = code => {
      return code;
  }

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QRScanner