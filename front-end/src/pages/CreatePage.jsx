import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleCreateProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'}>
          Create New Product
        </Heading>
        <Box w={'100%'} bg={useColorModeValue('gray.50', 'gray.800')}>
          <VStack spacing={4}>
            <Input name={'name'} placeholder={'Product Name'} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <Input name={'price'} placeholder={'Price'} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <Input name={'image'} placeholder={'Image URL'} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            <Button colorScheme={'blue'} onClick={handleCreateProduct} w={'100%'}>Create Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage