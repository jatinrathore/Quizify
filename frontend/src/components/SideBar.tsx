import { Accordion } from "@chakra-ui/react";
import TopicNameAccordion from "./TopicNameAccordion";

interface Props {
  onChangeGenre: (genre: string) => void;
}
const SideBar = ({ onChangeGenre }: Props) => {
  const topics = [
    { id: 1, title: "English", genre: "english" },
    { id: 2, title: "General Knowledge", genre: "general knowledge" },
    { id: 3, title: "Aptitude", genre: "aptitude" },
    { id: 4, title: "Java Programming", genre: "java" },
    { id: 5, title: "JavaScript", genre: "javascript" },
    { id: 6, title: "C++ Programming", genre: "c++" },
    { id: 7, title: "HTML", genre: "html" },
    { id: 8, title: "CSS", genre: "css" },
  ];

  return (
    <div>
      <Accordion allowToggle>
        {topics.map((topic) => (
          <TopicNameAccordion
            key={topic.id}
            title={topic.title}
            genre={topic.genre}
            onChangeGenre={(genre) => onChangeGenre(genre)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default SideBar;
