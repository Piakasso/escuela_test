import styled from "styled-components";
import { IButtonProps } from "../types";

const ButtonEl = styled.button`
  cursor: pointer;
  align-self: center;
  padding: 5px 20px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.4)" : "#d0f4f0"};
  border: 2px #18191f solid;
  box-shadow: 6px 6px #18191f;
  font-family: inherit;
  font-size: 16px;
`;

const Button = ({ handleSave, disabled }: IButtonProps) => {
  return (
    <ButtonEl onClick={handleSave} disabled={disabled}>
      Save card
    </ButtonEl>
  );
};

export default Button;
