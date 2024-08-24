import {
  Box,
  Flex,
  Link,
  useMediaQuery,
  IconButton,
  Stack,
  useDisclosure,
  HStack,
  WrapItem,
  Avatar,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaHome, FaLink, FaFileAlt } from 'react-icons/fa';

export const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" py={4} w="100%">
      {isMobile ? (
        <Flex direction="column" align="center" gap="10px">
          <Stack spacing={4} mt={4}>
            <WrapItem>
              <Avatar
                size="2xl"
                name="Giovani Zeferino"
                src="https://i.imgur.com/1qCOlmH.png"
              />{' '}
            </WrapItem>
            <Link
              color="white"
              as={NextLink}
              href="/"
              onClick={onClose}
              display="flex"
              alignItems="center"
            >
              <FaHome size="24px" style={{ marginRight: '8px' }} />
              Giovani Zeferino
            </Link>
            <Link
              color="white"
              as={NextLink}
              href="/meus-links"
              onClick={onClose}
              display="flex"
              alignItems="center"
            >
              <FaLink size="24px" style={{ marginRight: '8px' }} />
              Meus Links
            </Link>
            <Link
              color="white"
              as={NextLink}
              href="/curriculo"
              onClick={onClose}
              display="flex"
              alignItems="center"
            >
              <FaFileAlt size="24px" style={{ marginRight: '8px' }} />
              Meu Currículo
            </Link>
          </Stack>
        </Flex>
      ) : (
        <Flex align="center" justify="left" gap="20px" ml="20px">
          <WrapItem>
            <Avatar
              size="md"
              name="Giovani Zeferino"
              src="https://i.imgur.com/1qCOlmH.png"
            />{' '}
          </WrapItem>
          <Link
            as={NextLink}
            href="/"
            color="white"
            display="flex"
            alignItems="center"
          >
            <FaHome size="24px" style={{ marginRight: '8px' }} />
            Giovani Zeferino
          </Link>
          <Link
            as={NextLink}
            href="/meus-links"
            color="white"
            display="flex"
            alignItems="center"
          >
            <FaLink size="24px" style={{ marginRight: '8px' }} />
            Meus Links
          </Link>
          <Link
            as={NextLink}
            href="/curriculo"
            color="white"
            display="flex"
            alignItems="center"
          >
            <FaFileAlt size="24px" style={{ marginRight: '8px' }} />
            Meu Currículo
          </Link>

          <Link
            color="white"
            href="https://www.linkedin.com/in/giovani-zeferino-15505857"
            isExternal
            display="flex"
            alignItems="center"
          >
            <FaLinkedin size="50px" />
          </Link>
        </Flex>
      )}
    </Box>
  );
};
