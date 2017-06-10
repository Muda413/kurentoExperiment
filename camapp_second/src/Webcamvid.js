import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';


class Webcamvid extends Component {
  constructor(props){
    super(props);
    this.state = { videoSrc: null };
    this.handleVideo = this.handleVideo.bind(this);
    this.videoError = this.videoError.bind(this);
    this.classifyImage = this.classifyImage.bind(this);
  }

  componentDidMount(){

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
    }

  }



  classifyImage(e){
    e.preventDefault();
    // const origin = window.location.origin;
    // const FRAME_URL = '/frame';
    // axios.get(FRAME_URL).then((res) => {
    //   console.log("FRAME_URL response object:",res)
    // }).catch((err) => {
    //   console.log("error from FRAME_URL:", err);
    // })

    console.log("click event object:", e);
        console.log("videoSrc blob object:", this.state.videoSrc);
        var blob = new Blob([`${this.state.videoSrc}`], { type: "video/webm"});
        var blobUrl = window.URL.createObjectURL(blob);
        console.log("blob:", blob);
        console.log("blobUrl:", blobUrl);

var xhr = new XMLHttpRequest();
console.log("xhr:", xhr);
xhr.open('GET', blobUrl);
xhr.responseType = "blob";

xhr.onload = function() {
   var recoveredBlob = xhr.response;
   console.log("recoveredBlob:",recoveredBlob);
   var reader = new FileReader();
   console.log("reader:", reader);

   reader.onload = function() {
     var blobAsDataUrl = reader.result;
     console.log("blobAsDataUrl:",blobAsDataUrl);
     window.location = blobAsDataUrl;
   };

   reader.readAsDataURL(recoveredBlob);
};

xhr.send();
}


// const FRAME_URL = 'http://localhost:3000/api/frame';
// const PREDICT_URL = 'http://localhost:3000/api/predict';
// axios.post(FRAME_URL).then((res) => {
//     console.log("FRAME_URL response object:",res)
//     axios.get(PREDICT_URL).then((res) => {
//         console.log("PREDICT_URL response object:",res)
//         this.setState({ videoSrc: res.data.video });
//     }).catch((err) => {
//       console.log("error from PREDICT_URL:", err);
//     })
// }).catch((err) => {
//   console.log("error from FRAME_URL:", err);
// })




// var xhr = new XMLHttpRequest;
// xhr.open("POST", 'http://localhost:3000', true);

// //Send the proper header information along with the request
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
// xhr.onreadystatechange = function() {//Call a function when the state changes.
//     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
//         // Request finished. Do processing here.
//            var recoveredBlob = xhr.response;
//         var reader = new FileReader;
//         console.log("reader:", reader);
//
//         reader.onload = function() {
//           var blobAsDataUrl = reader.result;
//           console.log("blobAsDataUrl:",blobAsDataUrl);
//           window.location = blobAsDataUrl;
//         };
//
//         reader.readAsDataURL(recoveredBlob);
//     }
// }
// xhr.send();

// console.log("msg:", msg);
// data:video/webm;base64,YmxvYjpodHRwOi8vbG9jYWxob3N0OjMwMDAvNGYyNWIzNWMtMzliZS00ZTIyLTkwYTctN2U4YzhkYTFmMWE3
    // const CAM_URL = String(this.state.videoSrc);
    // // const SERVER_URL = 'http://localhost:3000/api'
    // axios.get(CAM_URL).then((res) => {
    //     console.log("CAM_URL response object:",res)
    // }).catch((err) => {
    //   console.log("error from http get:", err);
    // })



  handleVideo(stream){
    console.log('Stream object:', stream);
    this.setState({ videoSrc: window.URL.createObjectURL(stream) });
  }

  videoError(err){
    console.log('video error:', err);
  }





  render(){


          return(
            <div>
            <video style={{ width: 750, height: 500 }} src={this.state.videoSrc} ref="video" autoPlay="true">
            </video>
            <div style={{ marginLeft: 420, width: 700 }}>
            <Button outline color="primary" size="lg" onClick = {this.classifyImage} block>Classify Image</Button>{' '}
            </div>
          </div>
          );
      
    // console.log('videoSrc state object:', this.state.videoSrc);
    // return(
    //   <div style={{ marginLeft: 420, width: 700 }}>
    //   <Button outline color="primary" size="lg" onClick = {this.classifyImage} block>Classify Image</Button>{' '}
    //   </div>
    // );

  }
}

export default Webcamvid;
