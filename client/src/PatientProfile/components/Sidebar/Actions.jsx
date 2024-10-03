import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  useClipboard,
  VStack,
} from '@chakra-ui/react'

export default function Actions() {
  const value = 'https://apple.com/cook'
  const { hasCopied, onCopy } = useClipboard(value)

  const profileUrl = useRef(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (hasCopied) {
      profileUrl.current.focus()
      profileUrl.current.select()
    }
  })

  const handleClick = () => {
    console.log('button clicked!')
    navigate("/speciality")
  }

  return (
    <VStack py={8} px={5} spacing={3}>
      <Button w="full" variant="outline" onClick={handleClick}>
        Book New Appointment
      </Button>
     
    </VStack>
  )
}
