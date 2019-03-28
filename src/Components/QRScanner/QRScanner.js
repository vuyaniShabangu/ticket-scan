import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import ScanResultModal from '../ScanResultModal/ScanResultModal'

class QRScanner extends Component {

    constructor (props){
        super(props);
      
      
        this.handleScan = this.handleScan.bind(this);
      
      }
      
  state = {
    result: '',
    modalShow: false,
    acceptedTicket: false,
    ticket_id: ''
  }
 
  handleScan = data => {
    //data = "https://tenflagsthemepark.co.za/tickets/?ticket_id=adb551273fb6320000removenow";

    if (data) {
        if(this.isValidQR(data)){
            let code = this.stripTicketID(data);
            let record;
            let self = this;
            axios.get('https://vome-77efd.firebaseio.com/'+code+'.json')
                .then(function (response) {
                    record = response.data;
                    self.setState({
                        result: record ? "Duplicate Scan" : "Successful Scan",
                        acceptedTicket: record ? false : true,
                        modalShow: true,
                        ticket_id: code
                    });   
                })
                .catch(function (error) {
                    
                    alert("Error");
                    console.log(error);
                    record = "teta";
                });
            
            this.postRecord(code);
            //alert("hang on...");
        }
        else{
            alert("Error: and invalid QR code was provided.");
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
    axios.put('https://vome-77efd.firebaseio.com/'+ticketID+'.json',
         { "scanned":true });
    
  }

  render() {
    
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div>
        {<QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />}
        {/*<button onClick={this.handleScan} >Scan</button>*/}
        <p>{this.state.result}</p>
        <ScanResultModal
          show={this.state.modalShow}
          onHide={modalClose}
          acceptedticket={this.state.acceptedTicket ? 1 : 0}
          ticket_id={this.state.ticket_id}
        />
      </div>
    )
  }
}

export default QRScanner