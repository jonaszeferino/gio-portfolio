import { Flex, Link } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Social = () => {
  return (
    <Flex justify="center" gap="20px" p="20px">
      <Link href="https://www.linkedin.com/in/giovani-zeferino-15505857" isExternal>
        <FaLinkedin size="50px" />
      </Link>
    </Flex>
  );
};
