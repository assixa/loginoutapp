import React, { useEffect, useState } from 'react'
import { useNavigate, Link, Form } from 'react-router-dom'
import axios from 'axios';


const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
  
  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return;
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      const user = response.data;

      // Navigate to the profile page and pass user data
      navigate.push({
        pathname: '/profil',
        state: { user }
      });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

    try {
      // Make API call to authenticate user
      const res = await axios.get('https://localhost:44390/api/Employees/GetEmployees', {
        params: {
          email: email,
          password: password
        }
      });
      if (res.data.find(({email}) => email === email).email && res.data.find(({password_em}) => password_em === password).password_em) 
      {
        const user = res.data.find(({email}) => email === email);
        <Link
        to={{
          pathname: '/profil',
          state: { pass: JSON.stringify(user) }
        }}
        >
        Profile
        </Link>
        navigate('/profil');
      } 
      else 
      {
        console.log(res.data.error);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          type='password'
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <button className={'inputButton'} type="submit"> Log in</button>
      </div>
    </div>
    </Form>
  )
}

export default Login