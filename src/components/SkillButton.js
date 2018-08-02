import React, { Component } from 'react';
import styled from 'styled-components';

const SkillButtonBackground = styled.div`
  position: absolute;
  width: 104px;
  height: 104px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: rgba(0, 147, 255, 0.35);
  box-shadow: 0 3px 6px rgba(0, 147, 255, 0.44);
  border-radius: 39px;
  margin: 1em;
  cursor: pointer;
  border: 12px solid
    ${props => {
      switch (props.status) {
        case 'locked':
          return 'rgba(92, 92, 92, 0.62)';
        case 'empty':
          return 'rgba(255, 255, 255, 0.62)';
        case 'selected':
        default:
          return 'rgba(87, 145, 255, 0.62)';
      }
    }};
`;

const SkillButtonImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.6);
  &:hover {
    transform: translate(-50%, -50%) scale(0.7);
  }
  transition: transform 0.3s cubic-bezier(0.64, 2.46, 0.63, 0.52);
`;

const SkillButton = ({
  id,
  x,
  y,
  label,
  status,
  onClick,
  onMouseEnter
}) => (
  <SkillButtonBackground
    status={status}
    x={x}
    y={y}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    <SkillButtonImage src={require(`../assets/img_${id}@2x.png`)} />
  </SkillButtonBackground>
);

export default SkillButton;
