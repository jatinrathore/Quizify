import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "./quizcarousel.css";
import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { GiSandsOfTime } from "react-icons/gi";

const QuizCarousel = () => {
  let sliders = ["A", "B", "C", "D"];
  const [counter, setCounter] = useState(0);

  let slideLength = 3;

  const nextSlide = () => {
    if (counter == slideLength - 1) {
      setCounter(0);
    } else {
      setCounter((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (counter == 0) {
      setCounter(slideLength);
    }
    setCounter((prev) => prev - 1);
  };

  return (
    <div className="qc-area">
      <div
        className="slide slide-lang"
        style={{
          left: `${0}%`,
          transform: `translateX(-${counter * 100}%)`,
        }}
      >
        <div className="qc-slide-details">
          <Text className="slide-details-title">Programming Quiz</Text>
          <Text className="slide-details-subtitle">
            Dive into the world of programming with MCQs covering Java,
            JavaScript, and C++.
          </Text>
          <Button colorScheme="pink" fontSize="20px">
            Take Quiz Now!
          </Button>
        </div>
        <div className="qc-slide-icon">
          <GiSandsOfTime />
        </div>
      </div>
      <div
        className="slide slide-general"
        style={{
          left: `${100}%`,
          transform: `translateX(-${counter * 100}%)`,
        }}
      >
        <div className="qc-slide-details">
          <Text className="slide-details-title">General Skills Quiz</Text>
          <Text className="slide-details-subtitle">
            Test your knowledge in general knowledge, aptitude, and English with
            our comprehensive MCQs.
          </Text>
          <Button colorScheme="orange" fontSize="20px">
            Take Quiz Now!
          </Button>
        </div>
        <div className="qc-slide-icon">
          <GiSandsOfTime />
        </div>
      </div>
      <div
        className="slide slide-web"
        style={{
          left: `${200}%`,
          transform: `translateX(-${counter * 100}%)`,
        }}
      >
        <div className="qc-slide-details">
          <Text className="slide-details-title">Web Development Quiz</Text>
          <Text className="slide-details-subtitle">
            Explore HTML, CSS, and JavaScript concepts with our interactive MCQs
            designed for web development enthusiasts.
          </Text>
          <Button colorScheme="messenger" fontSize="20px">
            Take Quiz Now!
          </Button>
        </div>
        <div className="qc-slide-icon">
          <GiSandsOfTime />
        </div>
      </div>

      {/* Carousel buttons and boxes */}

      <div className="highlight-boxes">
        <span className={`slide-box ${counter == 0 ? "selected" : ""}`}></span>
        <span className={`slide-box ${counter == 1 ? "selected" : ""}`}></span>
        <span className={`slide-box ${counter == 2 ? "selected" : ""}`}></span>
      </div>
      <div className="qc-btn-left">
        <button className="qc-btn " onClick={prevSlide}>
          <GrPrevious />
        </button>
      </div>
      <div className="qc-btn-right">
        <button className="qc-btn " onClick={nextSlide}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default QuizCarousel;