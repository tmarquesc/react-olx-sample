import styled, { keyframes } from 'styled-components';

export const Item = styled.div`
  button{
    display:block;
    border:1px solid #FFF;
    margin:10px;
    text-decoration:none;
    padding:10px;
    border-radius:5px;
    color:#000;
    background-color: #FFF;
    transition:all ease .3s;


    &:hover {
      background-color:#EEE;
      border:1px solid #CCC;
    }

    .itemImage img {
      width:100%;
      border-radius:5px;
    }

    .itemName {
      font-weight:bold;
    }
  }
`;

const fadeIn = keyframes`from { opacity: 0; }`;

export const Container = styled.div`
  position: relative;
  z-index: 0;
`;

export const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

export const Dialog = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const Fechar = styled.button`
  color:#FFF;
  font-family:'Arial';
  text-decoration:none;
  font-size: 15px;
  position: absolute;
  background-color:#000;
  text-align:center;
  right:0;
  top:0;
  padding:3px;
`;


export const PageArea = styled.div`
  form {
    background-color: #FFF;
    border-radius:3px;
    padding:10px;
    box-shadow:0px 0px 3px #999;

    .area {
      display:flex;
      align-items:center;
      padding:10px;
      max-width:500px;

      .area--title {
        width:200px;
        text-align:right;
        padding-right:20px;
        font-weight: bold;
        font-size: 14px;
      }
      .area--input {
        flex:1;

        input,select, textarea {
          width:100%;
          font-size:14px;
          padding:5px;
          border:1px solid #DDD;
          border-radius:3px;
          outline:0;
          transition: all ease .4s;

          &:focus {
            border:1px solid #333;
            color:#333;
          }
        }

        textarea {
          height:150px;
          resize:none;
        }

        button {
          background-color:#0089FF;
          border:0;
          outline:0;
          padding: 5px 10px;
          border-radius:4px;
          color:#FFF;
          font-size:15px;
          cursor:pointer;

          &:hover {
            background-color:#006F6E;
          }
        }

      }
    }

  }
`;