import styled from 'styled-components';

export const PageArea = styled.div`
    display:flex;
    flex-direction:column;
    background-color: #FFF;
    border-radius:3px;
    padding:10px 30px 10px 30px;
    box-shadow:0px 0px 3px #999;
  
  .leftSide {
    form {
        padding-right:30px;
        .area {
            display:flex;
            align-items:center;
            justify-content:flex-start;
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

                input {
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
    ::after {
            content:'';
            height:1px;
            background-color: #D3D3D3;
            display:flex;
            margin-top:20px;
    }
   
  }

  .rightSide {
        flex:1;
        

        .list {
            display:flex;
            .aditem {
                width:25%;
            }
        }
  }
`;