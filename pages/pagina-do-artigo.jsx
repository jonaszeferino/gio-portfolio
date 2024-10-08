import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Text,
  Center,
  Heading,
  Box,
  Tag,
  TagLabel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/router';
import { Social } from '../components/Social';
import ShareButtons from '@/components/ShareButtons';
import { FaFileAlt } from 'react-icons/fa'; // Importar o ícone

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getNews = async (articleId) => {
    try {
      const response = await fetch(`/api/articlesToSite?id=${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataRecive = await response.json();
        console.log('Dados do artigo:', dataRecive);
        // Atualizando para acessar o array de artigos
        setDataNews(Array.isArray(dataRecive.articles) ? dataRecive.articles : []);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Erro ao buscar o artigo:', response.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getNews(id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!dataNews.length) {
    return (
      <Center>
        <Text>Nenhum artigo encontrado.</Text>
      </Center>
    );
  }

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <br />
        <Breadcrumb m={10}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Artigos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Página do Artigo</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Center>
          <br />
          <br />
          <br />
          {dataNews.map((news) => (
            <Box
              key={news.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              shadow="sm"
              maxWidth={1200}
            >
              <Center>
                <Heading size="xl" maxWidth={1200}>
                  {news.article_title}
                </Heading>
              </Center>
              <br />
              <Text mt={2}>Por: {news.reporter_name}</Text>
              <Text mt={2} mb={2} display="flex" alignItems="center">
                Data: {moment(news.publicated_date).format('DD/MM/YYYY')}
                <Text as="span" ml={2} fontSize="sm">({moment(news.publicated_date).fromNow()})</Text>
              </Text>
              <Center>
                <br />
                {news.image_link ? ( // Verifica se há imagem
                  <Box
                    as="img"
                    src={news.image_link}
                    alt={news.article_title}
                    borderRadius="md"
                    width={'1200px'}
                    objectFit="cover"
                    mb={2}
                  />
                ) : (
                  <Box
                    width="1200px" // Largura do box quando não há imagem
                    height="200px" // Altura do box quando não há imagem
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <FaFileAlt size="50px" /> {/* Ícone representando um artigo */}
                  </Box>
                )}
              </Center>
              <Center>
                <Text
                  maxWidth={1200}
                  mt={2}
                  dangerouslySetInnerHTML={{ __html: news.article_main }}
                  sx={{ textAlign: 'justify' }}
                />
              </Center>
              <br />
              <Center>
                {Array.isArray(news.article_tags) &&
                  news.article_tags.length > 0 &&
                  news.article_tags.map((tag) => (
                    <Tag
                      key={tag.label}
                      colorScheme={tag.color}
                      borderRadius="full"
                      mx={1}
                    >
                      <TagLabel>{tag.label}</TagLabel>
                    </Tag>
                  ))}
              </Center>
              <br />
              <br />
              <Center>
                <ShareButtons
                  id={news.id}
                  title={news.article_title || ''}
                />
              </Center>
            </Box>
          ))}
        </Center>
        <br />
        <br />        
        <br />
      </ChakraProvider>
    </>
  );
};

export default App;