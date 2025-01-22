export const getEllipsisText = (str: string, n: number = 6): string => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };