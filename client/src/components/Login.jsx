import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Login() {

  //this is "credentials, setCredentials" in lecture video
  const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });
  const { username, password } = credentials;

  const navigate = useNavigate();

  const [error, setError] = useState('');
  

    // STEP 3 - CONSUME THE CONTEXT
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };

    const login = async (e) => {
      e.preventDefault();
      //  update this function to use the login function from the context
      auth.login(credentials);
      navigate("/")
    };
  
    const logout = () => {
      auth.logout();
    };

  // const [data, setData] = useState(null)

  // const login = async () => {

  //   try {
  //     const {data} = await axios("/api/login", {
  //       method: "POST",
  //       data: formData
  //     });
  //     console.log(data);
  //     setData(data.message);

  //     localStorage.setItem("token", data.token);
  //   } catch (error) {
  //     console.log(error);
  //     setData(error.message);
  //   }
  // }

  // const login = (event) => {
  //   event.preventDefault();
  //   axios.post('/api/login', formData)
  //     .then(response => {
  //       // successful login
  //       console.log('Login successful', response.data);
  //       navigate('/');  
  //     })
  //     .catch(error => {
  //       setError(error.response ? error.response.data.message : 'Login failed');
  //     });
  // };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;