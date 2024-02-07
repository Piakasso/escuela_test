import { useState, MouseEvent } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import red from "../../assets/checkbox - discard.png";
import placeholder from "../../assets/placeholder.jpeg";

import { deleteDictionary } from "./dictionarySlice";
import { IDictionaryItemProps } from "../../types";

const DictionaryItemEl = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 3px solid;
  padding: 10px;
  gap: 40px;

  & .delete {
    cursor: pointer;
  }

  & h3 {
    flex: 1;
    text-align: start;
  }
  & div {
    width: 100px;
    height: 100px;
    border-radius: 12px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
`;

const DictionaryItem = ({ title, coverImage }: IDictionaryItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    dispatch(deleteDictionary(title.en));
  };

  return (
    <Link to={`cards/${title.en}`}>
      <DictionaryItemEl
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <img src={coverImage === "" ? placeholder : coverImage} alt="" />
        </div>
        <h3>{title.en}</h3>
        {isHovered && (
          <img src={red} alt="" className="delete" onClick={handleDelete} />
        )}
      </DictionaryItemEl>
    </Link>
  );
};

export default DictionaryItem;
