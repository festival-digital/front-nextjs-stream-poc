import { useRouter } from 'next/router';
import socketIOClient from "socket.io-client";
import React, { useContext, useEffect, useState } from 'react';
import Store from '../../store/Store';
import Lobby from '../lobby/lobby';
import {
  Container, Content, RoomsList,
  RoomCard, Label, Header,
} from './roomList.style';

const roomEntry = ({ setError, name, room, router, state, dispatch }) => {
  console.log('roomEntry -> state', state);
  if (!name) {
    setError('Informe um nome');
    return;
  }
  if (!room) {
    setError('Informe uma sala');
    return;
  }
  state.socket.on('participants', (data) => dispatch({
    type: 'SET_ROOM',
    data,
  }));
  dispatch({
    type: 'SET_AUTH',
    data: {
      ...state.auth,
      name,
      room,
    },
  });
  router.push(`/${state.auth.type}`);
};

const connectSocket = async ({ dispatch }) => {
  const socket = await socketIOClient('http://192.168.0.15:8080', { transports: ['websocket'] });
  dispatch({
    type: 'SET_SOCKET',
    socket,
  });
}

const RoomList = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!state.auth.type) router.push('/');
    connectSocket({ dispatch });
  }, []);
  return (
    <Container>
      <Lobby
        onSubmit={(data) => roomEntry({ ...data, router, state, dispatch, setError })}
        name={name}
        setName={setName}
        room={room}
        setRoom={setRoom}
        error={error}
      />
      <Content>
        <Header>
          <Label>nome</Label>
          <Label>online</Label>
        </Header>
        <RoomsList>
          {state.rooms.map((room) => (
            <RoomCard onClick={() => setRoom(room.name)}>
              <Content>
                <Label>{room.name}</Label>
              </Content>
              <Content>
                <Label>{room.length}</Label>
              </Content>
            </RoomCard>
          ))}
        </RoomsList>
      </Content>
    </Container>
  )
}

export default RoomList;