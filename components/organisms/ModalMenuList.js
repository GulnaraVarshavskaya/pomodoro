import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";

const ModalContainer = styled.div`
    position: absolute;
    width: 150px;
    left: 60px;
    top: 150px;
    border-radius: 10px;
    background-color: #EFF1FA;
    box-shadow: 0px 4px 10px rgba(26, 39, 95, 0.25);
    z-index: 200;
    /* @media only screen and (min-width: 768px) {
        inset: calc((100vh - 464px) / 2) calc((100vw - 540px) / 2);
  } ; */
`

const MenuUl = styled.div`
    padding: 18px 14px;
`

const MenuList = styled.div`
    margin-bottom: 18px; 
    cursor: pointer;
`

const MenuListBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`

const MenuListImg = styled.image`
    vertical-align: middle;
    padding: 0;
    margin: 0;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
    &:focus {
        outline: 0;
    }
`

const MenuListText = styled.span`
    font-size: 14px;
    font-weight: 500px;
    line-height: 18px;
    align-items: center;
    color: rgba(22, 25, 50, 1);
    margin-left: 12px;
    cursor: pointer;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }   
`;


function ModalMenuList () {
    const { showModalMenuListId, ref, handleDeleteProject, handleRenameProject } = useContext(settingsContext);

    return (
        <ModalContainer 
        showModalMenuListId={showModalMenuListId}
        ref={ref}
        >
            <MenuUl>
                <MenuList>
                    <MenuListBtn
                    onClick={handleRenameProject}
                    >
                        <MenuListImg>
                            <img src="./assets/icon-edit.svg" alt="Edit" />
                        </MenuListImg>
                        <MenuListText>Rename</MenuListText>
                    </MenuListBtn>
                </MenuList>
                <MenuList>
                    <MenuListBtn
                    onClick={handleDeleteProject}                 
                    >
                        <MenuListImg>
                            <img src="./assets/icon-trash.svg" alt="Delete" />
                        </MenuListImg>
                        <MenuListText>Delete</MenuListText>
                    </MenuListBtn>
                </MenuList>
            </MenuUl>
        </ModalContainer>
    )
}

export default ModalMenuList;