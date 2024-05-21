export interface GeminiResponseData {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  }