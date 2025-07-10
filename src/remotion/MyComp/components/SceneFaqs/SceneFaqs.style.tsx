import {Paper} from '@mui/material';
import styled from 'styled-components';

export const IconFaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  width: 216px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 100;
`;

export const Question = styled.div`
  padding: 10px;
  background: #f5f5f5;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

export const Answer = styled.div`
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ddd;
`;

export const TitleSeeAll = styled.div`
  color: #388083;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const CustomPaper = styled(Paper)`
  position: absolute;
  right: 60px;
  top: 20px;
  width: 216px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 3;
  padding: 10px;
  z-index: 100;
  max-height: 300px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #388083;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: #388083 transparent;
`;
