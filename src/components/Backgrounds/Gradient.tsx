import styled, { keyframes } from "styled-components";
import Holder from "./Holder";

const subtleTransition = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`;

const Gradient = styled(Holder)`
  background: linear-gradient(225deg, rgb(255, 229, 79), rgb(179, 46, 136));
  animation: ${subtleTransition} 15s linear infinite;
  background-size: 300% 300%;
`;

export default Gradient;
