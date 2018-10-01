import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

injectGlobal`
  ${styledNormalize};
  
  body, html {
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
    -webkit-tap-highlight-color:transparent;
  }
`;