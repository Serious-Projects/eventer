import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import GlobalStyles from './globalStyles';
import App from './App';

function Root() {
   return (
      <React.StrictMode>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </React.StrictMode>
   );
}

const rootEl = document.getElementById('root');

ReactDOM.createRoot(rootEl).render(<Root />);
