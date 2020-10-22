import React, { useState, useEffect, useRef, useContext } from 'react';
import gpu from 'gpu.js';
import styled from 'styled-components';
import Store from '../../store/Store';
import { initStream } from './room.controller';


const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
`;
const Header = styled.div`
  text-align: center;
  font-size: 2em;
  max-height: calc(100vh - 120px);
`;
const PeopleContainer = styled.div`
  text-align: center;
  font-size: 2em;
`;
const Input = styled.input`
  box-sizing: unset;
  background-color: #686868;
  appearance: none;
  border: 1px solid #1a1a1a;
  padding: 3px 5px;
  border-radius: 5px;
  margin: 0;
  width: 150px;
`;
const Label = styled.label`
`;
const Name = styled.label`
  position: absolute;
  bottom: 15px;
  margin: auto;
  left: 0;
  right: 0;
  text-shadow: 2px 2px 4px;
`;
const Button = styled.button`
  border-radius: 5px;
  margin: 0;
  background-color: #686868;
  padding: 4px 7px;
  margin-top: 20px;
`;
const FaceWrapper = styled.div`
  position: relative;
  box-shadow: 2px 16px 28px -9px rgba(0,0,0,0.75);
  height: 250px;
  margin: 15px;
  width: 400px;
  display: inline-block;
`;

const MyFaceWrapper = styled.div`
  position: fixed;
  box-shadow: 2px 16px 28px -9px rgba(0,0,0,0.75);
  height: 150px;
  width: 300px;
  margin: 15px;
  bottom: 10px;
  right: 40px;
  display: inline-block;
`;

const Faces = styled.video`
  height: 250px;
  width: 400px;
  object-fit: cover;
  background-color: #000;
`;

const MyFaces = styled.canvas`
  height: 150px;
  width: 300px;
  object-fit: cover;
  background-color: #000;
`;

const myIntermal = ({ room, stream, socket }) => {
  setInterval(async ()=> {
    const imageCapture = new ImageCapture(stream.getVideoTracks()[0])
    const blobImage = await imageCapture.takePhoto();
    let canvas = document.getElementById('me');
    // canvas.parentNode.removeChild(canvas);
    console.log('myIntermal -> canvas', canvas);
    const image = new Image(window.URL.createObjectURL(blobImage));
    console.log('myIntermal -> window.URL.createObjectURL(blobImage)', window.URL.createObjectURL(blobImage));
    var ctx = canvas.getContext('2d');
    image.onload = function(){
      ctx.drawImage(this, 0, 0, 400, 250)
      
      ctx.stroke();
    }
    console.log('myIntermal -> image', image);
    
    image.src = window.URL.createObjectURL(blobImage);
    
    // const render = new gpu.GPU({ mode: "gpu" }).createKernel(function() {
    // })
    // .setOutput([512, 512])
    // .setGraphical(true);
    
    // canvas = render.canvas;
    // console.log('myIntermal -> render.canvas', render.canvas);
    // const myself = document.getElementById('myself');
    // myself.appendChild(canvas)

    socket.emit('image', { room_id: room.room_id, blob: blobImage, streamer_id: socket.id });
  }, 500);
}
const runZoom = () => {
  console.log('sadasd:: ', global)
  if (typeof window !== "undefined") {
    console.log('runZoom -> window', window);
    console.log('runZoom -> ZoomMtg', ZoomMtg);
    // console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av');
    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareJssdk();
    ZoomMtg.init({
      debug: true,
      meetingNumber: 8342518293,
      userName: 'Branca',
      userEmail: 'isaquebc@gmail.com',
      passWord: 'I@I39103991i',
      apiKey: 'VAgYCdRiRHqHVF_y0BZorA',
      signature: 'VkFnWUNkUmlSSHFIVkZfeTBCWm9yQS42NDU0NDc5MTMwLjE2MDMzODA4MTM3NTkuMC5RTEhwUkhRRjZMOFNqOEZ6NmJySSt2UU9xQVYwc3I0VkxPSHBhZjdzamFZPQ==',
      // participantId: 'UUID',
      leaveUrl: 'http://localhost:3000/leave',
      // debug: true,
      success: (success) => {
        console.log('success')
      },
      error: (error) => {
        console.log('error')
      }
    });
  }
}

const Room = ({
  room,
  stream,
  socket,
  peersRef,
}) => {
  const store = useContext(Store);
  const [startZoom, setStartZoom] = useState(null);
  console.log('store', store);
  useEffect(() => {
    // myIntermal({ room, stream, socket })
    // initStream({ socket, stream, room, store, peersRef });
    runZoom()
  }, [startZoom]);
  return (
    <Container>
      <Header>
        <Label>{'sala: '}</Label>
      </Header>
      <div id="zmmtg-root"></div>
      <div id="aria-notify-area"></div>        
      {/* <PeopleContainer>
          {room.participants.filter((p) => (p.socket_id !== socket.id)).map(p => (
            <FaceWrapper>
              <Faces id={p.socket_id} />
              <Name>{p.name}</Name>
            </FaceWrapper>
          ))}
          <MyFaceWrapper id="myself">
            <MyFaces id={'me'} src={"/static/images/lala.jpeg"} />
            <Name>{'EU'}</Name>
          </MyFaceWrapper>
      </PeopleContainer>
      {room.participants.filter((p) => (p.socket_id !== socket.id)).map(p => (
        <audio>
          <source id={`a#${p.socket_id}`} src="" type="audio/ogg" />
        </audio>
      ))}
      <Label>{socket.id}</Label> */}
    </Container>
  )
}

export default Room;
