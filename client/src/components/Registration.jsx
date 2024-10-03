import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'



function Registration() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    role: 'patient', // default role
    date_of_birth: '',
    image: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Post the form data to the API endpoint
    axios.post('/api/register', formData)
      .then(response => {
        console.log('User registered', response.data);
         
      })
      .catch(error => {
        setError(error.response ? error.response.data.message : 'Registration failed');
      });

      navigate('/login'); 
  };

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    // <div>

<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to book your next hospital appointment
          </Text>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>

           <form onSubmit={handleSubmit}> 
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text"
                   value={formData.first_name}
                   onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                </FormControl>
              </Box>

              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" 
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}/>
                </FormControl>
              </Box>

              
            </HStack>

            <HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
              </FormControl>

              <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
              </FormControl>

            </HStack>

            <HStack>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
              </FormControl>

              <FormControl id="date-of-birth" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" 
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}/>
              </FormControl>
            </HStack>

            <FormControl id="image">
              <FormLabel>Image URL</FormLabel>
              <Input type="text" 
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}/>
              </FormControl>

            <Stack spacing={10} pt={10}>
              <Button
              type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'Black'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Register
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}
                onClick={handleLogin}
                _hover={{
                cursor: 'pointer', 
                }}>
                Login</Link>
              </Text>
            </Stack>
          </Stack>
        </form>

        </Box>
      </Stack>
    </Flex>

      
  );
}

export default Registration;

