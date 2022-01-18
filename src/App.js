import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';

function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={ <LoginPage/> }  />
          <Route path="/login" exact element={ <LoginPage/> }  />
          <Route path="/home" exact element={ <HomePage/> }  />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
