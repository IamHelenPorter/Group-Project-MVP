import { Container } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'

export default function Main() {

  const [privateData, setPrivateData] = useState(null);

  // get private user data on page load -> useEffect()!
  useEffect(()=>{
    requestData();
  }, []);
  console.log(privateData)

  const navigate = useNavigate();

  const requestData = async () => {
    //0. if no token then redirect to login, don't let the user see the page
     let token = localStorage.getItem("token")
     if (!token) navigate("/")

    //1. send post request including authorization header
      let options = {
        method: "GET",
        headers: {"authorization": `Bearer ${token}`}
      }

      let results = await fetch("http://localhost:4000/api/private", options);
      let data = await results.json();

    //2. store response private data
      setPrivateData(data);
  };

  return (
    <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
      
      <Sidebar privateData={privateData}/>
      <Content privateData={privateData}/>
    </Container>
  )
}
