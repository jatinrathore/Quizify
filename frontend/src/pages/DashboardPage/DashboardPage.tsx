import { Box, Text } from "@chakra-ui/react";
import GitFooter from "../../components/GitFooter";
import NavBar from "../../components/NavBar";
import { TbBrandCss3 } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { FaJava } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { SiCplusplus } from "react-icons/si";
import { TbFileTypeHtml } from "react-icons/tb";
import { RiEnglishInput } from "react-icons/ri";
import QuizCarousel from "../../components/QuizCarousel";
import "./dashboardpage.css";
import PracticeCard from "../../components/PracticeCard";

const DashboardPage = () => {
  return (
    <div>
      <NavBar />
      <div className="db-outer-container">
        <div className="db-inner-container">
          <div className="db-heading-box">
            <Text className="db-title">
              Welcome to Quizify - A learning platform
            </Text>
            <Text className="db-subtitle">
              Sharpen skills with interview MCQs on diverse topics and test
              knowledge with timed quizzes.
            </Text>
          </div>
          <div className="db-quiz-carousel">
            <div className="db-qc-container">
              <QuizCarousel />
            </div>
          </div>
        </div>
        <div className="inner-container-two">
          <div className="db-categories">
            <Text>Explore Practice Topics</Text>
          </div>
          <div className="db-cards-container">
            <PracticeCard
              title="Java"
              subtitle="Ready to sharpen your Java skills? Start now!"
              children={<FaJava fontSize="40px" />}
            />
            <PracticeCard
              title="JavaScript"
              subtitle="JavaScript mastery starts here. Dive in now!"
              children={<TbBrandJavascript fontSize="40px" />}
            />
            <PracticeCard
              title="C++"
              subtitle="Start your C++ journey today! Let's begin."
              children={<SiCplusplus fontSize="40px" />}
            />
            <PracticeCard
              title="English"
              subtitle="Enhance your English fluency! Practice now!"
              children={<RiEnglishInput fontSize="40px" />}
            />
            <PracticeCard
              title="General"
              subtitle="Expand your knowledge with engaging GK Qus."
              children={<BiWorld fontSize="40px" />}
            />
            <PracticeCard
              title="Aptitude"
              subtitle="Boost your aptitude skills with practice Qus."
              children={<GiBrain fontSize="40px" />}
            />
            <PracticeCard
              title="HTML"
              subtitle="Unlock HTML's power with hands-on practice!"
              children={<TbFileTypeHtml fontSize="40px" />}
            />
            <PracticeCard
              title="CSS"
              subtitle="Level up your CSS skills with practice!"
              children={<TbBrandCss3 fontSize="40px" />}
            />
          </div>
        </div>
      </div>
      <GitFooter />
    </div>
  );
};

export default DashboardPage;
