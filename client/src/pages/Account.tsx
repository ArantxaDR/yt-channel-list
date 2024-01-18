
import { useNavigate } from 'react-router-dom';
import ChannelList from '../components/ChannelList';

const Account = () => {
  const navigate = useNavigate();
  const isUserSignedIn = !!localStorage.getItem('token');
  
  if (!isUserSignedIn) { 
      return navigate('/');
  }
  else{

  return (
    
    <div className='bg-primary w-full h-screen'>
      <ChannelList />
    </div>
	
    );
    }
};

export default Account;