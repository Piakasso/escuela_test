import styled from "styled-components";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import DictionaryPage from "./pages/DictionaryPage";
import DetailsPage from "./pages/DetailsPage";

interface AppProps {
  readonly $active: boolean;
}

const AppEl = styled.div<AppProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 16px;
  color: #18191f;
  font-weight: 700;
  min-height: 100vh;
  overflow-y: hidden;
  background-color: ${(props) => (props.$active ? "#f6a89e" : "#d0f4f0")};
  @media (max-width: 767px) {
    font-size: 14px;
    font-weight: 600;
  }
  @media (max-width: 479px) {
    overflow-y: hidden;
  }
`;

function App() {
  const location = useLocation();
  return (
    <AppEl $active={location.pathname === "/"}>
      <Header />
      <Routes>
        <Route path="/" element={<DictionaryPage />} />
        <Route path="/cards/:slug" element={<DetailsPage />} />
      </Routes>
    </AppEl>
  );
}

export default App;
