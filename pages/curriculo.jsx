import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';

const Tips = () => {
  const [data, setData] = useState([]);

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define como mobile se a largura for menor que 768px
    };

    handleResize(); // Chama a função inicialmente
    window.addEventListener('resize', handleResize); // Adiciona o listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove o listener ao desmontar
    };
  }, []);

  const printPage = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Currículo de Giovani Zeferino de Oliveira</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
            h1 { text-align: center; font-size: 14px; }
            .section { margin-bottom: 20px; }
            @media print {
              body { width: 210mm; height: 297mm; }
              h1 { font-size: 16px; }
            }
          </style>
        </head>
        <body>
          <h1>Currículo de Giovani Zeferino de Oliveira</h1>
          <div class="section">
            <h2>Informações Pessoais</h2>
            <p>Email: giovanizeferino@gmail.com</p>
            <p>Telefone: 51 99590-5538</p>
            <p>Data de Nascimento: 29/09/1991</p>
            <p>Cidade: Cachoeirinha/RS</p>
          </div>
          <div class="section">
            <h2>Educação</h2>
            <p>Comunicação Social - Jornalismo - ULBRA / Canoas (RS)</p>
            <p>Políticas Públicas - UFRGS/ Porto Alegre (RS)</p>
          </div>
          <div class="section">
            <h2>Qualificações</h2>
            <p>Conhecimento na área de assessoria política e relacionamento com clientes</p>
            <p>Criação e edição de conteúdo para internet</p>
            <p>Analista de conteúdo cibernético</p>
            <p>Analista de inteligência de mercado e Big Data</p>
            <p>Experiência em pesquisa acadêmica e produção, edição e produção audiovisual, criação literária e produção jornalística</p>
          </div>
          <div class="section">
            <h2>Experiência Profissional</h2>
            <p>SportsData - Agosto de 2023 até o presente momento</p>
            <p>Sports Scout - Fornecimento de relatórios de dados de eventos esportivos em tempo real.</p>
            <p>Canal do Youtube Sala de Secação - Criador de conteúdo desde Junho de 2023.</p>
            <p>TELUS International - Personalized Internet Ads Assessor de Março de 2020 a Novembro de 2023.</p>
            <p>Lionbridge - Internet Ads Assessor de Setembro de 2017 a Fevereiro de 2020.</p>
            <p>Plugar Data & Intelligence - Consultor de inteligência de dados de Abril de 2014 a Agosto de 2018.</p>
            <p>Jornal Opa! - Jornalista de Janeiro de 2014 a Dezembro de 2014.</p>
            <p>Câmara Municipal de Cachoeirinha/RS - Estágio de Junho de 2012 a Abril de 2014.</p>
          </div>
          <div class="section">
            <h2>Informações Complementares</h2>
            <p>Inglês avançado; Intermediário em espanhol;</p>
            <p>Photoshop, Adobe Premiere, Corel Draw - Cursos Pró-Ativo;</p>
            <p>Curso de Política Contemporânea - Instituto Saberes;</p>
            <p>Participante do Festival de Curtas-Metragens ULBRADOC.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const VerticalTabButton = ({ label, isActive }) => (
    <Box
      as="button"
      w="100%"
      h="40px"
      bg={isActive ? 'blue.500' : 'gray.100'}
      color={isActive ? 'white' : 'black'}
      borderRadius="0"
      border="1px solid"
      borderColor="gray.300"
      _hover={{ bg: 'blue.500', color: 'white' }}
    >
      {label}
    </Box>
  );

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
        <Heading mt="50px" fontSize={{ base: '20px', md: '24px' }} m={10}>
          Currículo de Giovani Zeferino de Oliveira
        </Heading>
      </Center>
      <Center>
        <Button onClick={printPage} mt="20px" size={{ base: 'sm', md: 'md' }}>
          Imprimir Currículo A4
        </Button>
      </Center>
      <br />

      {isMobile ? (
        <Center mt="10px" mb="100px">
          <Box
            overflowX="auto"
            width="100%"
            maxWidth="900px"
            px={{ base: '4', md: '0' }}
          >
            <Tabs variant="enclosed" size={{ base: 'sm', md: 'md' }} isLazy>
              <TabList overflowX={{ base: 'auto', md: 'initial' }} overflowY="hidden">
                <HStack spacing={{ base: 2, md: 4 }} minWidth="max-content">
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Informações Pessoais
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Educação
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Qualificações
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Experiência Profissional
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Informações Complementares
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }} h="50px">
                    Meus Links
                  </Tab>
                </HStack>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>Email: giovanizeferino@gmail.com</Text>
                    <Text>Telefone: 51 99590-5538</Text>
                    <Text>Data de Nascimento: 29/09/1991</Text>
                    <Text>Cidade: Cachoeirinha/RS</Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      Comunicação Social - Jornalismo - ULBRA / Canoas (RS)
                    </Text>
                    <Text>Políticas Públicas - UFRGS/ Porto Alegre (RS)</Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      Conhecimento na área de assessoria política e
                      relacionamento com clientes
                    </Text>
                    <Text>Criação e edição de conteúdo para internet</Text>
                    <Text>Analista de conteúdo cibernético</Text>
                    <Text>Analista de inteligência de mercado e Big Data</Text>
                    <Text>
                      Experiência em pesquisa acadêmica e produção, edição e
                      produção audiovisual, criação literária e produção
                      jornalística
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      SportsData - Agosto de 2023 até o presente momento
                    </Text>
                    <Text>
                      Sports Scout - Fornecimento de relatórios de dados de
                      eventos esportivos em tempo real.
                    </Text>
                    <Text>
                      Canal do Youtube Sala de Secação - Criador de conteúdo
                      desde Junho de 2023.
                    </Text>
                    <Text>
                      TELUS International - Personalized Internet Ads Assessor
                      de Março de 2020 a Novembro de 2023.
                    </Text>
                    <Text>
                      Lionbridge - Internet Ads Assessor de Setembro de 2017 a
                      Fevereiro de 2020.
                    </Text>
                    <Text>
                      Plugar Data & Intelligence - Consultor de inteligência de
                      dados de Abril de 2014 a Agosto de 2018.
                    </Text>
                    <Text>
                      Jornal Opa! - Jornalista de Janeiro de 2014 a Dezembro de
                      2014.
                    </Text>
                    <Text>
                      Câmara Municipal de Cachoeirinha/RS - Estágio de Junho de
                      2012 a Abril de 2014.
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>Inglês avançado; Intermediário em espanhol;</Text>
                    <Text>
                      Photoshop, Adobe Premiere, Corel Draw - Cursos Pró-Ativo;
                    </Text>
                    <Text>
                      Curso de Política Contemporânea - Instituto Saberes;
                    </Text>
                    <Text>
                      Participante do Festival de Curtas-Metragens ULBRADOC.
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      <a
                        href="https://www.linkedin.com/in/seu-perfil"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Text>
                    <Text>
                      <a
                        href="https://www.youtube.com/seu-canal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube
                      </a>
                    </Text>
                    <Text>
                      <a
                        href="https://twitter.com/seu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </Text>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      ) : (
        <Center mt="10px" mb="100px">
          <Box
            overflowX="auto"
            width="100%"
            maxWidth="900px"
            px={{ base: '4', md: '0' }}
          >
            <Tabs variant="enclosed" size={{ base: 'sm', md: 'md' }} isLazy>
              <TabList>
                <HStack spacing={4}>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>
                    Informações Pessoais
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>Educação</Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>
                    Qualificações
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>
                    Experiência Profissional
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>
                    Informações Complementares
                  </Tab>
                  <Tab fontSize={{ base: '12px', md: '14px' }}>Meus Links</Tab>
                </HStack>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>Email: giovanizeferino@gmail.com</Text>
                    <Text>Telefone: 51 99590-5538</Text>
                    <Text>Data de Nascimento: 29/09/1991</Text>
                    <Text>Cidade: Cachoeirinha/RS</Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      Comunicação Social - Jornalismo - ULBRA / Canoas (RS)
                    </Text>
                    <Text>Políticas Públicas - UFRGS/ Porto Alegre (RS)</Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      Conhecimento na área de assessoria política e
                      relacionamento com clientes
                    </Text>
                    <Text>Criação e edição de conteúdo para internet</Text>
                    <Text>Analista de conteúdo cibernético</Text>
                    <Text>Analista de inteligência de mercado e Big Data</Text>
                    <Text>
                      Experiência em pesquisa acadêmica e produção, edição e
                      produção audiovisual, criação literária e produção
                      jornalística
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      SportsData - Agosto de 2023 até o presente momento
                    </Text>
                    <Text>
                      Sports Scout - Fornecimento de relatórios de dados de
                      eventos esportivos em tempo real.
                    </Text>
                    <Text>
                      Canal do Youtube Sala de Secação - Criador de conteúdo
                      desde Junho de 2023.
                    </Text>
                    <Text>
                      TELUS International - Personalized Internet Ads Assessor
                      de Março de 2020 a Novembro de 2023.
                    </Text>
                    <Text>
                      Lionbridge - Internet Ads Assessor de Setembro de 2017 a
                      Fevereiro de 2020.
                    </Text>
                    <Text>
                      Plugar Data & Intelligence - Consultor de inteligência de
                      dados de Abril de 2014 a Agosto de 2018.
                    </Text>
                    <Text>
                      Jornal Opa! - Jornalista de Janeiro de 2014 a Dezembro de
                      2014.
                    </Text>
                    <Text>
                      Câmara Municipal de Cachoeirinha/RS - Estágio de Junho de
                      2012 a Abril de 2014.
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>Inglês avançado; Intermediário em espanhol;</Text>
                    <Text>
                      Photoshop, Adobe Premiere, Corel Draw - Cursos Pró-Ativo;
                    </Text>
                    <Text>
                      Curso de Política Contemporânea - Instituto Saberes;
                    </Text>
                    <Text>
                      Participante do Festival de Curtas-Metragens ULBRADOC.
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" fontSize={{ base: '12px', md: '14px' }}>
                    <Text>
                      <a
                        href="https://www.linkedin.com/in/giovani-zeferino-15505857/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Text>
                    <Text>
                      <a
                        href="https://www.youtube.com/@SaladeSecacao"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube
                      </a>
                    </Text>
                    <Text>
                      <a
                        href="https://x.com/SaladeSecacao"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </Text>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      )}
    </ChakraProvider>
  );
};

export default Tips;
