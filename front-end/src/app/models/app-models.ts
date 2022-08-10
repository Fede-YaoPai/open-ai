export interface AppState {
  username: string;
  aiName: string;
  textareaContent: string;
  loading: boolean;
}

export interface OpenAIResponseBody {
  choices: OpenAIResponseChoice[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }
}

export interface OpenAIResponseChoice {
  finish_reason: string;
  index: number;
  logprobs: any;
  text: string;
}