import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

export const ProductCard = ({ product }) => {

  const [updateProduct, setUpdateProduct] = useState(product);
  const { deleteProduct, updateProductDetails } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);
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

  const handleUpdateProduct = async (id, updateProduct) => {
    const { success, message } = await updateProductDetails(id, updateProduct);
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
    onClose();
  }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'transform .3s ease'}
      _hover={{ transform: 'scale(1.1)', shadow: 'xl' }}>
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />


      <Box
        mt={2}
        fontWeight={600}
        lineHeight={1.4}
        color={useColorModeValue('gray.600', 'gray.200')}>
        {product.name}
      </Box>
      <Box
        mt={2}
        fontWeight={600}
        lineHeight={1.4}
        color={useColorModeValue('gray.600', 'gray.200')}>
        ${product.price}
      </Box>
      <HStack>
        <IconButton aria-label='Edit' colorScheme='blue' icon={<EditIcon />} onClick={onOpen}></IconButton>
        <IconButton aria-label='Delete' colorScheme='red' icon={<DeleteIcon />} onClick={handleDeleteProduct}></IconButton>
      </HStack>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input name={'name'} placeholder={'Product Name'} value={updateProduct.name} onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} />
              <Input name={'price'} placeholder={'Price'} value={updateProduct.price} onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} />
              <Input name={'image'} placeholder={'Image URL'} value={updateProduct.image} onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={'blue'} onClick={() => handleUpdateProduct(product._id, updateProduct)} w={'100%'}>Update Product</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard