import Image from 'next/image';
import styled, {css} from 'styled-components';

type IconProps = {
  width?: string | number;
  height?: string | number;
};

export const StyledIcon = styled.div<IconProps>`
  ${({width, height}) => css`
    width: ${width ?? '54px'};
    height: ${height ?? '48px'};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const StyledTenantIcon = styled.div<IconProps>`
  ${({width, height}) => css`
    width: ${width ?? '54px'};
    height: ${height ?? '48px'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    cursor: pointer;
  `}
`;

export const StyledImage = styled(Image)<{filter: string}>`
  ${({filter}) => css`
    filter: ${filter};
    & svg {
      fill: #f00;
    }
  `}
  border-radius: 4px;
`;
