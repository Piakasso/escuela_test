import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderEl = styled.header`
  display: flex;
  padding: 20px 15px 0 15px;
  border-bottom: 8px solid;
  justify-content: space-between;
  @media (max-width: 767px) {
    border-bottom: 4px solid;
  }
`;

const HeaderLink = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 16px 32px;
  border-radius: 16px 16px 0 0;
  border: solid 2px;
  background-color: #f9f3e5;

  @media (max-width: 767px) {
    padding: 10px 20px;
  }
`;

const Header = () => {
  return (
    <HeaderEl>
      <nav>
        <Link to="/">
          <HeaderLink>Go to lists</HeaderLink>
        </Link>
      </nav>
    </HeaderEl>
  );
};

export default Header;
