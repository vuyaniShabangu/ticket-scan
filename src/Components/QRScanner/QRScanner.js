import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import { resolveNaptr } from 'dns';
 
class QRScanner extends Component {

    constructor (props){
        super(props);
      
      
        this.handleScan = this.handleScan.bind(this);
      
      }
      
  state = {
    result: ''
  }
 
  handleScan = data => {
      data = "https://tenflagsthemepark.co.za/tickets/?ticket_id=adb551273fb6320000";
      //alert(data)

    if (data) {
        if(this.isValidQR(data)){
            let code = this.stripTicketID(data);
            let record;
            axios.get('https://vome-77efd.firebaseio.com/'+code+'.json')
                .then(function (response) {
                    alert("bam")
                    record = "meta";      
                })
                .catch(function (error) {
                    record = "teta";
                });
                alert(record);
            this.setState({
                result: record == null ? "Successful Scan" : "Duplicate Scan"
            });
            this.postRecord(code);
            //alert("hang on...");
        }
        else{
            this.setState({
                result: "Invalid Ticket Provided."
            });
        }
        
    }
  }

  handleError = err => {
    console.error(err)
  }

  

  isValidQR = qrCode => {
    let valid = false;
    if(qrCode)
    {
        valid = qrCode.includes("tenflagsthemepark.co.za");
    }
    return valid;
  }

  stripTicketID = qrCode => {
    let ticketID = qrCode.replace("https://tenflagsthemepark.co.za?ticket_id=", "");
    ticketID = ticketID.replace("&action=mt-verify","");
    return ticketID;
  }


  getRecord = ticketID => {
    let toReturn;
    axios.get('https://vome-77efd.firebaseio.com/'+ticketID+'.json')
    .then(function (response) {
        alert("bam")
        console.log(response.data);
        toReturn = response.data;        
    })
    .catch(function (error) {
        console.log(error);
        alert("There was an error in connecting to server. Please check your internet connection.");
        return;
    });
    return toReturn;
  }

  postRecord = ticketID => {
    axios.post('https://vome-77efd.firebaseio.com/'+ticketID+'.json',
         { "scanned":true });
    
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