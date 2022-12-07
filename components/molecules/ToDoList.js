import React, { useContext } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'
import ToDoListModal from '../organisms/ToDoListModal'

const ToDoListContainer = styled.div`
    display: flex;
    justify-content: center; 
`

const ToDoListButton = styled.button`
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
    &:focus {
        outline: none;
        border: none;
  }
`

const ToDoListSvg = () => (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="1">
    <path d="M9.3335 5.5H27.7502" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.3335 14H27.7502" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.3335 22.5H27.7502" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.25 5.5H2.26237" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.25 14H2.26237" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.25 22.5H2.26237" stroke="#D7E0FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>
)

function ToDoList() {

    const { openModal, showModal, closeModal } = useContext(settingsContext)

    return (
        <ToDoListContainer>           
            <ToDoListButton
            onClick={openModal}
            >
                <ToDoListSvg />                
            </ToDoListButton>
            { showModal ? <ToDoListModal 
            closeModal={closeModal} 
            showModal={showModal}
            /> : null }
        </ToDoListContainer>
    )
}

export default ToDoList;