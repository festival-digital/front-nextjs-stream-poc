/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Store = React.createContext();

export const initialState = {
  auth: {},
  socket: null,
  rooms: [
    { name: 'sala 01', length: 2 },
    { name: 'sala 02', length: 2 },
    { name: 'sala 03', length: 1 },
    { name: 'sala 04', length: 1 },
    { name: 'sala 05', length: 2 },
  ],
  room: null,
};

export const reducer = (state, action) => {
  if (action.type === 'SET_ROOM')console.log('reducer -> action', action);
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.data };
    case 'SET_ROOM':
      return { ...state, room: action.data };
    case 'SET_SOCKET':
      return { ...state, socket: action.socket };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const { children, value } = props;
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.object.isRequired,
};

StoreProvider.defaultProps = {
  children: [],
};

export default Store;
