import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';
import { FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'; // Importando ícones

const Tips = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  return (
    <ChakraProvider>
      <Head>
        <title>Currículo de Giovani Zeferino de Oliveira</title>
        <meta
          name="description"
          content="Currículo de Giovani Zeferino de Oliveira"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Center>
        <Heading mt="50px" fontSize="24px" m={10}>
          Links Giovani Zeferino de Oliveira
        </Heading>
      </Center>
   
      <br />

      <Center mt="10px" mb="100px" m={5}>
        <Box overflowX="auto" width="100%" maxWidth="900px">
          <VStack align="start" fontSize="54px">
            <Text>
              <a href="https://www.linkedin.com/in/giovani-zeferino-15505857/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </Text>
            <Text>
              <a href="https://www.youtube.com/@SaladeSecacao" target="_blank" rel="noopener noreferrer">
                <FaYoutube /> YouTube
              </a>
            </Text>
            <Text>
              <a href="https://x.com/salaDeSecacao" target="_blank" rel="noopener noreferrer">
                <FaTwitter /> Twitter
              </a>
            </Text>
          </VStack>
        </Box>
      </Center>

    
    </ChakraProvider>
  );
};

export default Tips;