import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }
    
    button {
        border: none;
        background: #ff6e40 ;
        color: #fff;
        font-weight: bold;
        padding: 1%;
        border-radius: 10px;
        border: 1px solid #ff6e40;
        cursor: pointer;

        &:hover {
            background: #fff;
            color: #ff6e40;
            
        }
    }`;
export default GlobalStyle;
