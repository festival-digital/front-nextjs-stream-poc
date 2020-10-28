import { useRouter } from 'next/router';
import socketIOClient from "socket.io-client";
import React, { useContext, useEffect, useState } from 'react';
import Store from '../../store/Store';
import Lobby from '../lobby/lobby';
import {
  Container, Content, RoomsList,
  RoomCard, Label, Header,
} from './roomList.style';
import { sortByParticipants } from '../utils/room.util';

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

const getRooms = async (dispatch) => {
  const rooms = await fetch('https://stream-back.oasi.vc/get-rooms', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  console.log('getRooms -> rooms', rooms);
  const response = await rooms.json();
  const sortedRooms = sortByParticipants({ roomList: response.rooms });
  console.log('getRooms -> response', sortedRooms);
  dispatch({
    type: 'SET_ALL_ROOMS',
    data: sortedRooms,
  });

}

const connectSocket = async ({ dispatch }) => {
  const socket = await socketIOClient('https://stream-back.oasi.vc', { transports: ['websocket'] });

  socket.on('updated_rooms', ((rooms) => {
  console.log('connectSocket -> rooms', rooms);
    dispatch({
      type: 'SET_ALL_ROOMS',
      data: rooms,
    });
  }))
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
    getRooms(dispatch)
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
            <RoomCard onClick={() => setRoom(room.room_id)}>
              <Content>
                <Label>{room.room_id}</Label>
              </Content>
              <Content>
                <Label>{room.participants.length}</Label>
              </Content>
            </RoomCard>
          ))}
        </RoomsList>
      </Content>
    </Container>
  )
}

export default RoomList;