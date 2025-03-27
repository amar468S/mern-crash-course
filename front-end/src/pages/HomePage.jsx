import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container w={'100%'}>
      <VStack spacing={10}>
        <Text fontSize={'4xl'}
        >Welcome to Product Store
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            lg: 3,
            md: 2
          }}
          spacing={10}
          w={'100%'}>

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>
        {products.length === 0 && (
          <Text fontSize={'xl'}>This is a simple product store built with React and Vite.
            No Products Found {" "}
            <Link to="/create">
              <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>Create Product</Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container >
  )
}

export default HomePage