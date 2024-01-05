
import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Update_photo } from './pages/update_photos';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/user/login' element={<Login/>} />
        <Route path='/user/register' element={<Register/>} />
        <Route path='/user/photo/upload' element={<Update_photo/>} />
        <Route path='*' element={<page not Found/>} /> 
    </Routes>
    </BrowserRouter>
    </div> 
  ); 
}

export default App; 