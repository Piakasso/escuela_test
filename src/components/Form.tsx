import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";

import { FormProps } from "../types";
import green from "../assets/green.png";

const FormEl = styled.form`
  display: flex;
  justify-content: center;
  gap: 20px;
  @media (max-width: 767px) {
    gap: 8px;
  }
`;

const Input = styled.input`
  width: 200px;
  border: 1px inherit solid;
  border-radius: 6px;
  padding-left: 7px;
  box-shadow: 6px 6px #33322e;
  & ::placeholder {
    color: gray;
  }

  @media (max-width: 479px) {
    width: 150px;
    padding-left: 4px;
    box-shadow: 3px 3px #33322e;
  }
`;
const SubmitButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  box-shadow: 6px 6px #33322e;
  @media (max-width: 479px) {
    box-shadow: 3px 3px #33322e;
    height: 20px;
    width: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Form = ({ placeholder, onSubmit, onBlur }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (onBlur) {
        onBlur(e.target.value);
      }
    }, 1000);
  };
  return (
    <FormEl onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <SubmitButton type="submit" disabled={inputValue === ""}>
        <Img src={green} alt="" />
      </SubmitButton>
    </FormEl>
  );
};

export default Form;
