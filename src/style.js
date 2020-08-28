import styled from "styled-components";

export const VideoContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: red;

  >.videozin {
    height: 200px;
    width: 350px;
  }
`;

export const Video = styled.video`
  height: 200px;
  width: 350px;
`;