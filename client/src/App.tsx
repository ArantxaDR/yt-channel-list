import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import NavBar from './components/NavBar';
import VideosList from './components/VideosList';

const App = () => {
  
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        
        <Route path='/videos-list/:channelId' element={<VideosList/>}/>
      </Routes>
    </>
  );
};

export default App;
