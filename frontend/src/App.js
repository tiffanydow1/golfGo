import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Account from './pages/Account';
import Game from './pages/Game';
import Courses from './pages/Courses';

import Structure from './components/basic/layout/Structure';

import Navbar from './components/custom/Navbar';

import theme from './theme';

/**
 * Global stylesheet for app
 * Only styles that can't be directly controlled by React applied here
 * ex: nothing beyond reset/normalize here
 */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}

  /* Additional overrides */
  html {
    /* iOS prevents smooth scrolling on certain divs, it should always be the case */
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
  }

  img {
    /* Remove 4px padding from the bottom of images */
    vertical-align: bottom;
  }
`;

const queryClient = new QueryClient();

const App = () => (
  <>
    <GlobalStyle />

    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Navbar />

          <Structure
            display="flex"
            justifyContent="center"
            marginTop="4.5rem"
            padding="1rem"
          >
            <QueryClientProvider client={queryClient}>
              <Hydrate state={window.__REACT_QUERY_STATE}>
                <GameProvider>
                  <Routes>
                    <Route path="/register" exact Component={Register} />
                    <Route path="/login" exact Component={Login} />
                    <Route path="/account" Component={Account} />
                    <Route path="/game" Component={Game} />
                    <Route path="courses" Component={Courses} />
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Home />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </GameProvider>
              </Hydrate>
            </QueryClientProvider>
          </Structure>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </>
);

export default App;
