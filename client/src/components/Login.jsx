import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'


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
    console.log("THIS IS THE AUTH CONTEXT", auth)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };

    const login = async (e) => {
      e.preventDefault();
      //  update this function to use the login function from the context
      auth.login(credentials);
      navigate("/profile")
    };
  
    const logout = () => {
      auth.logout();
      navigate("/")
    };


  return (
    <div>

<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>

        <form onSubmit={login}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" 
              name="username"
              value={username}
              onChange={handleChange}
              required
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" 
              name="password"
              value={password}
              onChange={handleChange}
              required/>
            </FormControl>

            <Stack spacing={10}>
              {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack> */}
              <Button
              type="submit"
                bg={'blue.400'}
                color={'black'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>


  
    </div>
  );
}

export default Login;