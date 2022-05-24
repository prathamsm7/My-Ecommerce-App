import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
