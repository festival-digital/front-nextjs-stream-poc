import React, { useState, useEffect, useRef, useContext } from 'react';
import Store from '../../store/Store';
import { joinStream } from './peer.controller';
import {
  Container, Header, Label, Image, Name,
  Person, Wrapper, VideoTag,
} from './peer.style';
import { useRouter } from 'next/router';

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.peer.on("stream", stream => {
        ref.current.srcObject = stream;
      })
  }, [props.peer]);

  return (
    <div>
      <VideoTag controls={false} autoPlay ref={ref} />
      <label></label>
    </div>
  );
}

const getName = ({ store, peer }) => {
  const person = store.state.room.participants.find(({ socket_id }) => peer.peerID === socket_id);
  console.log('getName -> person', person);
  if (!person) return null;
  return person.name || 'undefined';
}

const getMultimedia = async ({ setStream }) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 }
    }
  });
  setStream(stream);
}

const Peer = ({
}) => {
  const [peers, setPeers] = useState([]);
  const router = useRouter();
  const store = useContext(Store);
  const [stream, setStream] = useState(null);
  const peersRef = useRef([]);

  useEffect(() => {
    if (!store.state.auth.type || !store.state.auth.name || !store.state.auth.room ) {
      router.push('/');
      return;
    }
    getMultimedia({ setStream });
  }, []);

  useEffect(() => {
    if (stream) {
      joinStream({
        peers,
        store,
        stream,
        peersRef,
        setPeers,
      })
    }
  }, [stream]);
  return (
    <Container>
      <Header>
        <Label>{`sala: ${store.state.room ? store.state.room.room_id : ''}`}</Label>
      </Header>
      <Wrapper>
        {store.state.room ? (
          peers.filter((p) => p.peerID !== store.state.socket.id).map((p) => (
            <Person>
              <Video
                peer={p}
                // src={`https://robohash.org/${p.name.replace(/ /g, '')}`}
              />
              <Name>{getName({ store, peer: p })}</Name>
            </Person>
          ))
        ) : null}
      </Wrapper>
      <Label>{store.state.socket ? store.state.socket.id : ''}</Label>
    </Container>
  )
}

export default Peer;
