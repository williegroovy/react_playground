import styledNormalize from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  
  @import url('https://fonts.googleapis.com/css?family=Quicksand');
  
  body, html, #root {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    -webkit-tap-highlight-color:transparent;
  }
  
  .fadeIn {
    animation-name: fadeIn;
  }
  
  .animated {
    animation-fill-mode: both;
    animation-duration: 1.5s;
  }
  
  @keyframes fadeIn {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
`;

export default GlobalStyle;