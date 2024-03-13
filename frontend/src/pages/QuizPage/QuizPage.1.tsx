// import useQuizQuestions from "../../hooks/useQuizQuestions";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { Text } from "@chakra-ui/react";
// import { useTimer } from "./QuizPage";

// export const QuizPage = () => {
//   const { data: { questions } = {} } = useQuizQuestions("prog-lang");

//   const { seconds, minutes, start, pause, reset } = useTimer({
//     autoStart: false,
//   });

//   return (
//     <div className="quiz-container">
//       <div className="center-box">
//         <div className="header">
//           <span className="back-btn">
//             <IoIosArrowRoundBack />
//             <Text>Back</Text>
//           </span>
//           <div className="timer"></div>
//         </div>
//         <div className="question-box">
//           <div className="title-box"></div>
//           <div className="options-box"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
