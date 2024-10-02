import SimpleBar from 'simplebar-react';
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './helpers/index'
import Cover from './components/Cover'
import Main from './components/Main'

function PatientProfile() {
   
    return (

        <SimpleBar >
      <ChakraProvider theme={theme}>
       <Cover />
        <Main />
         
      </ChakraProvider>
    </SimpleBar>

    )
};

export default PatientProfile;

//Together.jsx