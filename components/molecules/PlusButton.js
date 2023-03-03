import styled from "styled-components";


const PlusButtonContainer = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    position: absolute;
    padding: 0;
    /* left: 40px; */
    bottom: 50px;
    &:hover {
        opacity: 0.7;
    }
    cursor: pointer;
`

const PlusButtonSvg = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3V17" stroke="#F87070" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 10H17" stroke="#F87070" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

const ButtonInputText = styled.span`
    padding-left: 10px;
    font-size: 16px;
    font-family: 'Kumbh Sans';
    font-weight: bold;
    line-height: 20px;
    color: rgba(248, 112, 112, 1);
    cursor: pointer;
`

function PlusButton(props) {
    // console.log("props", props)
    return (       
            <PlusButtonContainer
            onClick={props.onClick}
            >
                <PlusButtonSvg /> 
                <ButtonInputText>{props.children}</ButtonInputText>
                             
            </PlusButtonContainer>
    )
}

export default PlusButton
