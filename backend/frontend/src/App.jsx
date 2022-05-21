import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './components/Routes';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ChakraProvider>
          <AllRoutes />
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
