import { Navigate, Route, Routes, Outlet  } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import ChatBot from './components/chatBot/chatBot';


function App() {

  const PrivateRoute = () => {
    const token = localStorage.getItem('key')
    return (
      <>
      {token ? < Outlet />
      : <Navigate to="/login" />}
      </>
    )
  }

  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<ChatBot/>}/>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
