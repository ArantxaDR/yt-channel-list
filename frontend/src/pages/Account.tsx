
import ChannelList from '../components/ChannelList';
import LoginForm from './Login';

const Account = () => {

  const isUserSignedIn = !!localStorage.getItem('token');
  
  return (
    
    <div className='bg-primary w-full h-screen'>
      {isUserSignedIn ?  <ChannelList /> : <LoginForm /> }
     
    </div>
	
    );
    
};

export default Account;