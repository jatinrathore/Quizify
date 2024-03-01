export function extractNumberFromString(input: string): number | null {
  const match = input.match(/\d+/); // Match one or more digits
  if (match) {
    return parseInt(match[0], 10); // Convert matched string to number
  } else {
    return null;
  }
}

class StringUtils {
  static extractNumberFromString(input: string): number | null {
    const match = input.match(/\d+/); // Match one or more digits
    if (match) {
      return parseInt(match[0], 10); // Convert matched string to number
    } else {
      return null;
    }
  }

  static cropQuestionTitle = (questionTitle: string) => {
    const firstLinebreakIndex = questionTitle.indexOf("<linebreak>");
    if (firstLinebreakIndex !== -1) {
      return questionTitle.substring(0, firstLinebreakIndex);
    }
    return questionTitle;
  };
}

export default StringUtils;
