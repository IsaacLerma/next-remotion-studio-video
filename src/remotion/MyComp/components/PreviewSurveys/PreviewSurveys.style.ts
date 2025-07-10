import styled from 'styled-components';

export const StyledPreviewWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(43, 57, 72, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none; /* Allow clicks to pass through if not on survey content */
`;

export const StyledPreviewContent = styled.div`
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 80%; /* Adjust as needed for survey height relative to player */
  width: 100%;
  box-sizing: border-box;
  position: relative;
  pointer-events: auto;
`;

export const StyledQuestionTextContainer = styled.div`
  margin-bottom: 20px;
  flex-shrink: 0;
`;

export const StyledQuestionTextP = styled.p`
  color: white;
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: justify;
  margin: 0;
`;

export const StyledOptionsContainer = styled.div<{$bottomPadding: number}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: ${({$bottomPadding}) => $bottomPadding}px;
  scroll-behavior: smooth;
`;

export const StyledOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledRadioShape = styled.div<{
  $isSelected: boolean;
  $shapeSize: number;
  $shapePadding: number;
}>`
  width: ${({$shapeSize}) => $shapeSize}px;
  height: ${({$shapeSize}) => $shapeSize}px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${({$isSelected}) => ($isSelected ? 'white' : 'transparent')};
  transition: background-color 0.2s ease;
  flex-shrink: 0;
`;

export const StyledCheckboxShape = styled.div<{
  $isSelected: boolean;
  $shapeSize: number;
  $shapePadding: number;
}>`
  width: ${({$shapeSize}) => $shapeSize}px;
  height: ${({$shapeSize}) => $shapeSize}px;
  border-radius: 4px;
  border: 2px solid white;
  background-color: ${({$isSelected}) => ($isSelected ? 'white' : 'transparent')};
  transition: background-color 0.2s ease;
  flex-shrink: 0;
`;

export const StyledOptionText = styled.p`
  color: white;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

export const StyledInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-family: 'Montserrat';
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const StyledTextArea = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-family: 'Montserrat', sans-serif;
  min-height: 80px;
  resize: vertical;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const StyledNavigationContainer = styled.div<{
  $isSmallScreen: boolean;
  $padding: number;
}>`
  position: absolute;
  bottom: ${({$padding}) => $padding}px;
  width: calc(100% - (${({$padding}) => $padding}px * 2));
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
  position: relative;
`;

export const StyledActionButton = styled.button<{$isNextDisabled: boolean; $isFirstPage: boolean}>`
  background-color: #388083;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-family: 'Montserrat';
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;
  opacity: ${({$isNextDisabled}) => ($isNextDisabled ? 0.6 : 1)};
  pointer-events: ${({$isNextDisabled}) => ($isNextDisabled ? 'none' : 'auto')};

  &:hover {
    background-color: #2c6e71;
  }
`;
