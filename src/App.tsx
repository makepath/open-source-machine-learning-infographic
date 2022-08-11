import "./App.css";
import GlobalStyles from "./styles/global.styles";

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <h1>
          make<span style={{ color: "#12b5e8" }}>path</span>
        </h1>
        <br />
        <p>Open Source Machine Learning Infographic</p>
      </div>
    </>
  );
}

export default App;
