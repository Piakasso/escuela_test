import styled from "styled-components";

interface ContentProps {
  readonly $bgColor?: string;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow-y: hidden;
  background-color: ${(props) => props.$bgColor};

  @media (max-width: 767px) {
    padding: 10px;
    overflow-y: scroll;
  }
`;
