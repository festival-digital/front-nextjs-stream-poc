import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import { VideoContainer, Video as VideoTag } from '../src/style';
import { joinStream } from '../src/controller';
import styled from 'styled-components';

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.on("stream", stream => {
        console.log('VIDEO stream:', stream);
        ref.current.srcObject = stream;
      })
  }, [props.peer]);

  return (
      <VideoTag muted controls autoPlay ref={ref} />
  );
}

export default function Home() {
  const [peers, setPeers] = useState([]);
  // console.log('pee  rs:', peers)
  const [id, setId] = useState('ID');
  const [myStream, setMyStream] = useState(null);
  const socketRef = useRef();
  const peersRef = useRef([]);
  
  useEffect(() => joinStream({ setId, peers, setMyStream, peersRef, setPeers, socketRef }), []);
  
  useEffect(() => {
    if (myStream) {
      const video = document.getElementById(myStream.id);
      video.srcObject = myStream;
    }
  }, [myStream]);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{id}</h1>
        <VideoContainer id="video-container">
          {myStream ? (
            <VideoTag autoPlay muted controls id={myStream.id} srcObject={myStream} />
          ) : null}
          {peers.map((peer, index) => {
              return (
                  <Video key={index} peer={peer} />
              );
          })}
        </VideoContainer>
      </main>
      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
