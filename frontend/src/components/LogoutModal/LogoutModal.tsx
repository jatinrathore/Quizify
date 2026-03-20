import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./logoutmodal.css";
import { TokenManager } from "../../services/handleToken";

const LogoutModal = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    TokenManager.removeToken();
    toast.info("Logged out Successfully!");
    navigate("/");
  };

  return (
    <>
      <button onClick={onOpen} className="lm-logout-btn">
        <span>Log out</span>
        <IoLogOutOutline size="22px" />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent className="lm-content-card">
          <ModalBody pt={8} pb={2} textAlign="center">
            <Box className="lm-warning-icon-wrapper">
              <IoWarningOutline size="36px" className="lm-warning-icon" />
            </Box>
            <Heading fontSize={20} mt={4} className="lm-heading">
              Log out of Quizify?
            </Heading>
            <Text mt={3} className="lm-subtext">
              Your progress on any active quiz will be saved. You can log back
              in anytime to continue where you left off.
            </Text>
          </ModalBody>

          <ModalFooter gap={3} pb={6}>
            <button onClick={onClose} className="lm-cancel-btn">
              Cancel
            </button>
            <button onClick={handleClick} className="lm-confirm-btn">
              Yes, log me out
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;