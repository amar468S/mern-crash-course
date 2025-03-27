import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={"4"} bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row'
        }}
      >
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize={{ base: '3xl', sm: '4xl' }}
          fontWeight='extrabold'
          textTransform={'uppercase'}
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>
          <Link to="/create"><Button>Create</Button></Link>
          <Button onClick={toggleColorMode}>{colorMode === 'light' ? 'Dark' : 'Light'}</Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar