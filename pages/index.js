import Head from 'next/head'
import React, { useContext, useEffect } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { Wrapper, Button } from '../src/style';
import styled from 'styled-components';
import Store from '../store/Store';

const ClientRoom = dynamic(() => import('../src/room/room'), { ssr: false });

export const Main = styled.main`
  background-color: #373737;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const goToRooms = ({ router, store, type }) => {
  store.dispatch({
    type: 'SET_AUTH',
    data: {
      type
    },
  });
  router.push('/rooms');
};
const goToPeerRooms = () => {

};


export default function Home() {
  const router = useRouter();
  const store = useContext(Store);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.1/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.1/css/react-select.css" />
        <script SameSite="Secure" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/react.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/react-dom.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/redux.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/redux-thunk.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/jquery.min.js"></script>
        <script SameSite="Secure" src="https://source.zoom.us/1.8.1/lib/vendor/lodash.min.js"></script>

        <script async src="https://source.zoom.us/zoom-meeting-1.8.1.min.js"></script>
      </Head>
      <Main>
        <ClientRoom />
        {/* <Wrapper>
          <Button onClick={() => goToRooms({ router, store, type: 'peer' })}>
            Peer to Peer
          </Button>
          <Button onClick={() => goToRooms({ router, store, type: 'voice' })}>
            Voice
          </Button>
        </Wrapper> */}
      </Main>
      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            background-color: #373737;
            padding: none;
            margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
