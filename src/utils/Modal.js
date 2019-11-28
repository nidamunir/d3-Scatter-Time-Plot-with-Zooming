import React from "react";
import Portal from "./Portal";
import styled from "styled-components";
import Icon from "./Icon";

export default class Modal extends React.Component {
  render() {
    const { children, on, toggle } = this.props;
    return (
      <div>
        {on && (
          <Portal>
            <ModalWrapper>
              <ModalWindow>
                <ModalCard>
                  <CloseButton onClick={toggle}>
                    <Icon name="close" />
                  </CloseButton>
                  <div>{children}</div>
                </ModalCard>
                <Background onClick={toggle}></Background>
              </ModalWindow>
            </ModalWrapper>
          </Portal>
        )}
      </div>
    );
  }
}

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ModalWindow = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  background: #fff;
  min-width: 320px;
  position: relative;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 130px;
  z-index: 10;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  cursor: pointer;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
`;
