import Heading from '../atoms/Heading'
import PlusButton from '../atoms/PlusButton'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'


const ModalContainer = styled.div`
    display: flex;
    align-items: center;
`


const ToDoListModalContainer = styled.div`
    position: fixed;
    inset: calc((100vh - 580px)/2) calc((100vw - 328px)/2);
    border-radius: 25px;
    background-color: white;
    z-index: 100;
    @media only screen and (min-width: 768px){
        inset: calc((100vh - 464px)/2) calc((100vw - 540px)/2);
    };
`

const ToDoListModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(227, 225, 225, 1);
    padding: 24px 24px 28px;
    @media only screen and (min-width: 768px){
        padding: 33px 40px;
    };
`

const CloseButton = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
    &:focus {
        outline: 0;
    } 
`

const ToDoListModalBody = styled.div`
    padding: 0 24px 50px;
    @media only screen and (min-width: 768px){
        padding: 0 40px 50px;
    };
`



function ToDoListModal() {

    const { showModal, closeModal } = useContext(settingsContext)

  return (
    <ModalContainer showModal={showModal}>
    <ToDoListModalContainer>
        <ToDoListModalHeader>
            <Heading
            size="headingM"
            color="dark"
            >
                Projects
            </Heading>
            <CloseButton onClick={closeModal}>
                <img src="./assets/icon-close.svg" alt="Close modal" />
            </CloseButton>
        </ToDoListModalHeader>
        <ToDoListModalBody
        >
            <PlusButton>Add a project</PlusButton>
        </ToDoListModalBody>
    </ToDoListModalContainer>
    </ModalContainer>
  )
}

export default ToDoListModal