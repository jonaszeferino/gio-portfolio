import {
  Flex,
  Text,
  Heading,
  Card,
  CardFooter,
  Stack,
  CardBody,
  Button,
  Image,
  Box,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const News = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Adicione esta linha

  const getNews = async (page = 1) => { // Modifique a função para atualizar totalPages
    try {
      const response = await fetch(`/api/articlesToSite?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const newsData = await response.json();
        setData(newsData.articles);
        setCurrentPage(newsData.currentPage);
        setTotalPages(newsData.totalPages); // Atualize totalPages
      } else {
        console.error('Erro ao buscar as notícias:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const truncateHtml = (html, maxLength) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || '';

    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + '...';
    }

    const truncatedDiv = document.createElement('div');
    truncatedDiv.textContent = text;

    return truncatedDiv.innerHTML;
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Heading>Carregando...</Heading>
      </Flex>
    );
  }

  if (data.length === 0) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Heading>Sem notícias por agora...</Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="40px" align="center">
      <Navbar />
      <Heading w="80%" textAlign="center">
        Artigos
      </Heading>
      <Flex direction="column" gap="20px" w={['80%']}>
        {data.map((item, index) => (
          <Card
            key={index}
            direction="row"
            overflow="hidden"
            variant="outline"
            _hover={{
              boxShadow: 'xl',
              transform: 'scale(1.02)',
              transition: '0.3s',
            }}
          >
            <Stack direction={['column', 'row']} w="100%">
              <NextLink href={`/pagina-do-artigo?id=${item.id}`} passHref>
                <Image
                  objectFit="cover"
                  boxSize={['100%', '350px']}
                  src={item.image_link}
                  alt={item.article_title}
                  loading="lazy"
                  borderRadius="md"
                />
              </NextLink>

              <Stack w="100%">
                <CardBody>
                  <Heading fontSize="lg" textTransform="uppercase" w="100%">
                    {item.article_title}
                  </Heading>
                  <Box pt="20px" w="100%">
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: truncateHtml(item.article_main, 250),
                      }}
                      sx={{ textAlign: 'justify' }}
                    />
                    <NextLink href={`/pagina-do-artigo?id=${item.id}`} passHref>
                      <Button ml="10px" variant="solid" colorScheme="blue">
                        Veja mais
                      </Button>
                    </NextLink>
                  </Box>
                </CardBody>
                <CardFooter flexDirection="column" gap="10px" w="100%">
                  <Flex justify="space-between" w="100%">
                    <Text>Fonte: {item.reporter_name}</Text>
                    <Text>
                      {formatDistanceToNow(new Date(item.publicated_date), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </Text>
                  </Flex>
                </CardFooter>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Flex>
      <Center>
        <Flex justify="space-between" w="100%" mt="20px">
          <Button
            p={2}
            onClick={() => getNews(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Anterior
          </Button>

          <Button onClick={() => getNews(currentPage + 1)} p={2} isDisabled={currentPage === totalPages}>
            Próximo
          </Button>
        </Flex>
      </Center>
      {/* <Social /> */}
    </Flex>
  );
};

export default News;