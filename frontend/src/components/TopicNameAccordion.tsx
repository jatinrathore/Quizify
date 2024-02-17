import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface Props {
  title: string;
  genre: string;
  onChangeGenre: (genre: string) => void;
}
const TopicNameAccordion = ({ title, onChangeGenre, genre }: Props) => {
  const handleClickAccordion = () => {
    onChangeGenre(genre);
  };
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          _expanded={{ bg: "tomato", color: "white" }}
          onClick={handleClickAccordion}
        >
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TopicNameAccordion;
