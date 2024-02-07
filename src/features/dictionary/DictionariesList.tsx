import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DictionaryItem from "./DictionaryItem";
import { getDictionaries, selectAllDictionaries } from "./dictionarySlice";

const DictionariesListEl = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const DictionariesList = () => {
  const allDictionaries = useSelector(selectAllDictionaries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDictionaries());
  }, [dispatch]);

  return (
    <DictionariesListEl>
      {allDictionaries.list.map((dictionary) => (
        <DictionaryItem key={dictionary.title.en} {...dictionary} />
      ))}
    </DictionariesListEl>
  );
};

export default DictionariesList;
