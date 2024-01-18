import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormField } from '../commons/FormField';
import { Button } from '../commons/Button';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
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

  const handleResgister = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/register', {
        email,
        username,
        password,
      })
      .then(() => {
        setEmail(email);
        setUserName(username);
        setPassword(password);
        fetchUsers();
        navigate('/login');
      })
      .catch((error) => {
        setErrorResponse(error);
      });
  };
  return (
    <section className="w-full h-screen">
      <div className="bg-secondary h-[100%] text-primary-dark flex flex-col justify-center items-center">
      <h2 className="text-3xl uppercase font-bold text-primary bg-secondary text-center p-3">Sign Up</h2>
        <form className="text-center border border-primary rounded-lg w-[600px] h-[400px] mx-3 p-9"
        onSubmit={handleResgister}>
          {errorResponse && (
            <p className="text-red-600 text-center">{errorResponse}</p>
          )}
          <div className="relative">
            <FormField
              className="text-primary-dark font-semibold"
              label="User name"
              children={
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                  placeholder="Your name"
                  className="w-full text-primary-dark focus:border-primary-dark bg-primary-extraLight border border-primary py-1 px-2 rounded-lg mb-4"
                />
              }
            />
            <FormField
              className="text-primary-dark font-semibold"
              label="Email"
              children={
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
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
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                    className="w-full text-primary-dark focus:border-primary-dark bg-primary-extraLight border border-primary py-1 px-2 rounded-lg"
                  />
                  {showPass ? (
                    <EyeSlashIcon
                      onClick={handleShowPass}
                      className="absolute right-2 top-48 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                    />
                  ) : (
                    <EyeIcon
                      onClick={handleShowPass}
                      className="absolute right-2 top-48 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                    />
                  )}
                </>
              }
            />
          </div>
          <Button className="w-full mt-5">Sign up</Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
