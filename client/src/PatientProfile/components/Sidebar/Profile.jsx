import { useState, useEffect } from 'react';

import {
  Avatar,
  AvatarBadge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

function Profile({privateData}) {

  const [userProfile, setUserProfile] = useState(privateData?.image);
  const [imageUrl, setImageUrl] = useState(''); // State for the input URL
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle submission of the image URL
  useEffect(() => {
    setUserProfile(privateData?.image);
  }, [privateData]);

  const handleSubmitImage = async () => {

    let token = localStorage.getItem("token")
     if (!token) navigate("/")
    try {
      const response = await fetch('http://localhost:4000/api/update', {
        method: 'PUT',
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageUrl, // Send the image URL to the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the profile image');
      }

      const data = await response.json();
      setUserProfile(imageUrl); // Update the avatar with the new image URL
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  //using this variable in name under Avatar crashes the website
  // let fullName = `${privateData.first_name} ${privateData.last_name}`

  return (

      <div>
        {privateData &&(

          <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
           <Avatar
            size="2xl"
            name= "USER"
            cursor="pointer"
          onClick={onOpen} // Open modal when avatar is clicked
        src={userProfile ? userProfile : 'https://img.freepik.com/free-photo/closeup-view-domestic-cat-with-blurred-background_181624-17941.jpg?w=996&t=st=1727842586~exp=1727843186~hmac=4f8dedd753e52005870059c9f32834394367735a82b140c02c3b32b415719849'} 
      >
        <AvatarBadge bg="brand.blue" boxSize="1em">
          <svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </AvatarBadge>
          </Avatar>

          {/* Modal for submitting URL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
         <ModalHeader>Enter a new profile picture URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Input
              placeholder="https://example.com/your-image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)} // Update state with input value
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmitImage}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

          {/* <input
            hidden
            type="file"
            ref={profileImage}
            onChange={changeProfileImage}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Something went wrong</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>File not supported!</Text>
                <HStack mt={1}>
                  <Text color="brand.cadet" fontSize="sm">
                    Supported types:
                  </Text>
                  <Badge colorScheme="green">PNG</Badge>
                  <Badge colorScheme="green">JPG</Badge>
                  <Badge colorScheme="green">JPEG</Badge>
                </HStack>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}

          <VStack spacing={1}>
          <Heading as="h3" fontSize="xl" color="brand.dark">
            {`${privateData.first_name} ${privateData.last_name}`}
          </Heading>
          <Text color="brand.gray" fontSize="sm">
            {`${privateData.username}`}
          </Text>
        </VStack>
  
       </VStack>
        )}
      
      </div>
      

    
      
      
  )
}

export default Profile
