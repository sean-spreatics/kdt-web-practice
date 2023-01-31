import './styles/Prob60.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prob60Student from './Prob60Student';
import Prob60Main from './Prob60Main';

const Prob60 = () => {
  return (
    <header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Prob60Main />}></Route>
          <Route path="/student/:name" element={<Prob60Student />}></Route>
        </Routes>
      </BrowserRouter>
    </header>
  );
};

export default Prob60;
