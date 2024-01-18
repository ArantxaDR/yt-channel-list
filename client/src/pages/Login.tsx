import {  useState, FormEvent, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FormField } from '../commons/FormField';
import { Button } from '../commons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [ showPass, setShowPass ] = useState(false);
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();
  
    useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/register').then((res) => {
      console.log(res.data);
    });
  };
  
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const token = response.data.token;
      console.log('token: ', response.data);

      if (token) {
        localStorage.setItem('token', token);
        alert('Login OK');
        setUsername('');
        setPassword('');
        fetchUsers();
        navigate('/account'); 
      } else {
        setErrorResponse('Invalid credentials');
      }
    } catch (error) {
      setErrorResponse('Error occurred during login');
    }
  };

  return (
    <section className='w-full h-screen'>
    <div className="bg-secondary h-[100%] text-primary-dark flex flex-col justify-center items-center">
      <h2 className="text-3xl uppercase font-bold text-primary bg-secondary text-center p-3">Log In</h2>
        <form onSubmit={handleLogIn}
          className="text-center border border-primary rounded-lg w-[600px] h-[300px] mx-3 p-9"
        >
          {errorResponse && <p className='text-center text-red-600'>{ errorResponse }</p>}
        <div className="relative">
          <FormField
            className="text-primary-dark font-semibold"
            label="User"
            children={
              <input
                type="text"
                value={username}
                onChange={(event)=>setUsername(event.target.value)}
                placeholder="Your user name"
                className="w-full text-primary-dark focus:border-primary-dark bg-primary-extraLight border border-primary py-1 px-2 rounded-lg mb-4"
              />
            }
          />
          <FormField
            className="text-primary-dark font-semibold"
            label="Password"
            children={
              <>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(event)=>setPassword(event.target.value)}
                  placeholder="Your password"
                  className="w-full text-primary-dark focus:border-primary-dark bg-primary-extraLight border border-primary py-1 px-2 rounded-lg"
                />
                {showPass ? (
                  <EyeSlashIcon
                    onClick={handleShowPass}
                    className="absolute right-2 top-28 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={handleShowPass}
                    className="absolute right-2 top-28 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                  />
                )}
              </>
            }
          />
        </div>
        <Button className="w-full mt-5">Log in</Button>
      </form>
      </div>
     </section>
  );
};

export default LoginForm;
