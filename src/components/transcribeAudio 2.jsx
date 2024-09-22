// import React, { useState } from 'react';
// import Amplify from 'aws-amplify';
// import { AmazonAIPredictionsProvider, Predictions } from '@aws-amplify/predictions';
// import awsconfig from '../aws-exports.js';
// import mic from 'microphone-stream';
// Amplify.configure(awsconfig);
// Amplify.addPluggable(new AmazonAIPredictionsProvider());

// function TranscribeAudio(props) {
//     const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")
  
//     function AudioRecorder(props) {
//       const [recording, setRecording] = useState(false);
//       const [micStream, setMicStream] = useState();
//       const [audioBuffer] = useState(
//         (function() {
//           let buffer = [];
//           function add(raw) {
//             buffer = buffer.concat(...raw);
//             return buffer;
//           }
//           function newBuffer() {
//             console.log("resetting buffer");
//             buffer = [];
//           }
  
//           return {
//             reset: function() {
//               newBuffer();
//             },
//             addData: function(raw) {
//               return add(raw);
//             },
//             getData: function() {
//               return buffer;
//             }
//           };
//         })()
//       );
  
//       async function startRecording() {
//         console.log('start recording');
//         audioBuffer.reset();
  
//         window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
//           const startMic = new mic();
  
//           startMic.setStream(stream);
//           startMic.on('data', (chunk) => {
//             var raw = mic.toRaw(chunk);
//             if (raw == null) {
//               return;
//             }
//             audioBuffer.addData(raw);
  
//           });
  
//           setRecording(true);
//           setMicStream(startMic);
//         });
//       }
  
//       async function stopRecording() {
//         console.log('stop recording');
//         const { finishRecording } = props;
  
//         micStream.stop();
//         setMicStream(null);
//         setRecording(false);
  
//         const resultBuffer = audioBuffer.getData();
  
//         if (typeof finishRecording === "function") {
//           finishRecording(resultBuffer);
//         }
  
//       }
  
//       return (
//         <div className="audioRecorder">
//           <div>
//             {recording && <button onClick={stopRecording}>Stop recording</button>}
//             {!recording && <button onClick={startRecording}>Start recording</button>}
//           </div>
//         </div>
//       );
//     }
  
//     function convertFromBuffer(bytes) {
//       setResponse('Converting text...');
  
//       Predictions.convert({
//         transcription: {
//           source: {
//             bytes
//           },
//           // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
//         },
//       }).then(({ transcription: { fullText } }) => setResponse(fullText))
//         .catch(err => setResponse(JSON.stringify(err, null, 2)))
//     }
  
//     return (
//       <div className="Text">
//         <div>
//           <h3>Speech to text</h3>
//           <AudioRecorder finishRecording={convertFromBuffer} />
//           <p>{response}</p>
//         </div>
//       </div>
//     );
// }

// export default TranscribeAudio;