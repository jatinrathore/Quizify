import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";
import { GrCircleAlert } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CookieManager } from "../../services/handleCookies";

const LogoutModal = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const remove = CookieManager.removeCookie();

  const handleClick = () => {
    remove();
    toast.info("Logged out Successfully!");
    navigate("/");
  };

  return (
    <>
      <Box onClick={onOpen} display="flex" alignItems="center">
        <Text marginRight="8px">Log out</Text>
        <IoLogOutOutline size="22px" />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white" color="black" mt="200px">
          <ModalHeader>
            <GrCircleAlert color="red" fontSize={25} />
          </ModalHeader>
          <ModalBody>
            <Heading fontSize={20}>Caution!</Heading>
            <Text mt={4}>Are you sure you want to logout ?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              border="2px solid #DEDEDE"
              onClick={onClose}
              color="black"
              flex={1}
              mr={3}
            >
              Cancel
            </Button>
            <Button
              bg="#FC5A5A"
              flex={1}
              _hover={{ bg: "#FC5A5A" }}
              onClick={handleClick}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
