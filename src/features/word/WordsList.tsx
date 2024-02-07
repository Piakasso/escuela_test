import styled from "styled-components";
import { useSelector } from "react-redux";

import SingleWord from "./SingleWord";
import { selectWordsList } from "./wordsSlice";

const WordsListEl = styled.div`
  flex: 1;
  overflow: auto;
  text-align: center;

  & table {
    border-collapse: collapse;
    width: 100%;

    & thead {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    & td,
    th {
      border-bottom: 1px solid black;
    }
    & th {
      color: gray;
      background-color: #18191f;
    }
    & td {
      vertical-align: top;
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    overflow: visible;
  }
`;

const WarningEl = styled.span`
  color: #f6a89e;
`;

const WordsList = () => {
  const allWords = useSelector(selectWordsList);

  return (
    <WordsListEl>
      {(allWords.length >= 5 && allWords.length <= 20) || (
        <WarningEl>You need add from 5 to 20 words</WarningEl>
      )}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Espanol</th>
            <th>Russian</th>
            <th>English</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allWords.map((word, index) => (
            <SingleWord key={index} {...word} number={index + 1} />
          ))}
        </tbody>
      </table>
    </WordsListEl>
  );
};

export default WordsList;
