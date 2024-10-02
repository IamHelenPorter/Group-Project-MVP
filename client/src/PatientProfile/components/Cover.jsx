import cover from '../img/cover.jpg'
import { useRef, useState } from 'react'
import {
  Box,
  Image,
  useDisclosure,
} from '@chakra-ui/react'


export default function Cover() {
  const [coverImage, setCoverImage] = useState(null)
  const inputRef = useRef(null)

  return (
    <Box h={60} overflow="hidden">
      <Image
        w="full"
        h="full"
        objectFit="cover"
        src={coverImage ? coverImage : cover}
        alt="Cover"
      />
    </Box>
  )
}
