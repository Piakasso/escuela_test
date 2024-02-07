import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import red from "../../assets/checkbox - discard.png";

import { ISingleWordProps, IWord } from "../../types";
import { deleteWord, updateWord } from "./wordsSlice";
import { fetchTranslate } from "../../utils";

const SingleWordEl = styled.tr`
  & td {
    padding: 10px 0;
  }
  & img {
    vertical-align: middle;
    cursor: pointer;
  }
  & input {
    height: 100%;
  }
`;

const SingleWord = ({ number, learnWord, translate }: ISingleWordProps) => {
  const { en, ru } = translate;
  const [isInput, setIsInput] = useState(false);
  const [sp, setSp] = useState(learnWord);
  const [rus, setRus] = useState(ru);
  const [eng, setEng] = useState(en);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    setIsInput(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSp(e.target.value);
  };

  const handleSubmit = async () => {
    setIsInput(false);
    try {
      const translations = await Promise.all([
        fetchTranslate(sp, "es", "ru"),
        fetchTranslate(sp, "es", "en"),
      ]);
      setRus(translations[0].toLowerCase());
      setEng(translations[1].toLowerCase());
      const updatedWord: IWord = {
        learnWord: sp,
        translate: {
          en: translations[0].toLowerCase(),
          ru: translations[1].toLowerCase(),
        },
      };

      dispatch(updateWord({ updatedWord, number }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    dispatch(deleteWord(learnWord));
  };

  return (
    <SingleWordEl onClick={handleUpdate}>
      <td>{number}</td>
      <td>
        {isInput ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autoFocus
              onBlur={handleSubmit}
              onChange={handleChange}
              value={sp}
            />
          </form>
        ) : (
          sp
        )}
      </td>
      <td>{rus}</td>
      <td>{eng}</td>
      <td>
        <img
          src={red}
          alt=""
          height={20}
          width={20}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        />
      </td>
    </SingleWordEl>
  );
};

export default SingleWord;
