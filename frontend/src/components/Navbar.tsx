import { Box, Button, Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { FiGithub } from "react-icons/fi";

import NextLink from 'next/link'

const Links = [{
  id: "home",
  name: "Home",
  href: "/",
}]

interface Link {
  id: string,
  name: string,
  href: string
}


const NavLink = ({ children, link }: { children: ReactNode, link: Link }) => (
  <NextLink href={link.href}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      fontSize={"2xl"}
      href={"3"}>
      {children}
    </Link>
  </NextLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontSize={"2xl"}>Omar&#39;s Shopify Backend Challenge</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink key={link.id} link={link}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Link href="https://github.com/thisisomar/shopify-backend-challenge" target={"_blank"}>
              <IconButton
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                aria-label="GitHub link to this project"
                >
                <Icon as={FiGithub} w={8} h={8} />
              </IconButton>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.id} link={link}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}