import styled from "styled-components";

const colorBg = {
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}

const Button = styled.button`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    padding: 19px 47px;
    border-radius: 27px;
    background-color: ${(props) => colorBg[props.backgroundColor]};
    &:hover {
        /* background-color: rgba(248, 112, 112, 0.8); */
        background-color: rgba(250, 141, 141, 1);
    }
    font-size: 16px;
    font-family: 'Kumbh Sans';
    font-weight: bold;
    line-height: 16px;
    color: white;
    border: none;
    cursor: pointer;
`

export default Button
