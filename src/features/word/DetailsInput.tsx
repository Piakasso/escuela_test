import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../../components/Form";
import Button from "../../components/Button";

import { updateDictionary } from "../dictionary/dictionarySlice";
import { fetchTranslate } from "../../utils";
import { addWord } from "./wordsSlice";
import { RootState } from "../../app/store";
import { IWord } from "../../types";

const HeaderInputEl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
  gap: 10px;
  flex-shrink: 0;

  & .translation {
    font-size: 12px;
    flex: 1;

    & span {
      display: inline-block;
      padding-left: 10px;
      font-size: 20px;
      font-weight: 700;
    }
  }

  @media (max-width: 767px) {
    height: inherit;
    flex: 1;
    & .translation {
      flex: 0;
    }
  }
`;

const DetailsInput = () => {
  const [word, setWord] = useState("");
  const [english, setEnglish] = useState("");
  const [russian, setRussian] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const activeCard = useSelector((state: RootState) => state.activeCard);

  const handleTranslate = async () => {
    if (word === "") {
      setEnglish("");
      setRussian("");
    } else {
      try {
        const translations = await Promise.all([
          fetchTranslate(word, "es", "ru"),
          fetchTranslate(word, "es", "en"),
        ]);
        setRussian(translations[0].toLowerCase());
        setEnglish(translations[1].toLowerCase());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = () => {
    const newWord: IWord = {
      learnWord: word,
      translate: {
        en: english.toLowerCase(),
        ru: russian.toLowerCase(),
      },
    };
    if (russian !== "" && english !== "") {
      dispatch(addWord(newWord));
      setWord("");
    }
  };

  const handleSave = () => {
    dispatch(updateDictionary(activeCard));
    navigate("/");
  };

  useEffect(() => {
    handleTranslate();
  }, [word]);

  return (
    <HeaderInputEl>
      <Form
        placeholder="introduce una palabra"
        onSubmit={handleSubmit}
        onBlur={setWord}
      />
      <span className="translation">
        Russian:<span>{russian}</span>
      </span>
      <span className="translation">
        English: <span>{english}</span>
      </span>
      <Button
        handleSave={handleSave}
        disabled={activeCard.words.length < 5 || activeCard.words.length > 20}
      />
    </HeaderInputEl>
  );
};

export default DetailsInput;
