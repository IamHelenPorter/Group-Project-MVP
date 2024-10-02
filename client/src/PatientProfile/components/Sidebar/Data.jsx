import { Box, Text, VStack } from '@chakra-ui/react'

function Data({privateData}) {
  return (

    <div> {privateData &&(

      <VStack as="ul" spacing={0} listStyleType="none">

    <Box
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">Role</Text>
          <Text fontWeight="bold">{privateData.role}</Text>
        </Box>

        <Box
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">Date of Birth</Text>
          <Text fontWeight="bold">{privateData.date_of_birth}</Text>
        </Box>

        <Box
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">Email</Text>
          <Text fontWeight="bold">{privateData.email}</Text>
        </Box>
   
    </VStack>

    )}

    </div>
    
  )
}

export default Data
