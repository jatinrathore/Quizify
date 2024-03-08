export default interface QuestionsType {
  questionId: string;
  questionTitle: string;
  options: string[];
  answer: string;
  points: number;
  topicName: string;
  difficultyLevel: string;
}
