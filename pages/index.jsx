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
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaFileAlt } from 'react-icons/fa'; // Importar o ícone

const News = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Adicione esta linha

  const getNews = async (page = 1) => {
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
            direction={['column', 'row']} // Alterado para coluna no mobile
            overflow="hidden"
            variant="outline"
            _hover={{
              boxShadow: 'xl',
              transform: 'scale(1.02)',
              transition: '0.3s',
            }}
            p={4}
          >
            <NextLink href={`/pagina-do-artigo?id=${item.id}`} passHref>
              {item.image_link ? ( // Verifica se há imagem
                <Image
                  objectFit="cover"
                  boxSize={['100%', '200px']} // Alterado para 100% no mobile
                  height="100%" // Mantém a altura do card
                  src={item.image_link}
                  alt={item.article_title}
                  loading="lazy"
                  borderRadius="md"
                />
              ) : (
                <Box
                  boxSize={['100%', '200px']} // Tamanho do box quando não há imagem
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
            </NextLink>
            <Stack w="100%" mt={4}>
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
                </Box>
              </CardBody>
              <CardFooter flexDirection={['column', 'row']} justify="space-between" w="100%">
                <Text>Fonte: {item.reporter_name}</Text>
                <Text>
                  {formatDistanceToNow(new Date(item.publicated_date), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </Text>
                <NextLink href={`/pagina-do-artigo?id=${item.id}`} passHref>
                  <Button w="100%" variant="solid" colorScheme="blue">
                    Veja mais
                  </Button>
                </NextLink>
              </CardFooter>
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

          <Button
            onClick={() => getNews(currentPage + 1)}
            p={2}
            isDisabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </Flex>
      </Center>
      <br/>
    </Flex>
  );
};

export default News;