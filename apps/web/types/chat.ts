export interface ChatType {
  id: string;
  userId: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageType {
  id: string;
  chatId: String;
  role: "ai" | "user";
  prompt?: string | null;
  codeOutput?: string | null;
  codeExplanation?: string | null;
  videoUrl?: string | null;
  codeLoading: boolean;
  videoLoading: boolean;
  error: boolean;
  createdAt: Date;
}
