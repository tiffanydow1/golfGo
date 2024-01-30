import { createGlobalStyle } from "styled-components";
import { backgroundColors, textColors } from "./colors";

export const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
    }

    body,
    html {
      position: relative;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      display: block;
      min-height: 100vh;
    }

    body{
      font-family: 'Roboto', Helvetica, sans-serif;
      font-style: normal;
      font-weight: normal;
      color: ${textColors.primary};
      background: ${backgroundColors.primary};
      font-size: 24px;
      line-height: 24px;
    }

    h2, p{
      margin: 0;
    }

    ul {
      margin: 0;
      padding: 0;
    }
    li {
      list-style-type: none;
    }

    button {
      cursor: pointer;
    }
`;
