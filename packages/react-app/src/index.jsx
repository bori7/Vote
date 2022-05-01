import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
// import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
// import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// const themes = {
//   dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
//   light: `${process.env.PUBLIC_URL}/light-theme.css`,
// };

// const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App subgraphUri={subgraphUri} />
//     </ApolloProvider>
//   </React.StrictMode>,
// );

ReactDOM.render(
  <ApolloProvider client={client}>
    <App subgraphUri={subgraphUri} />
  </ApolloProvider>,
  document.getElementById("root"),
);

reportWebVitals();
