export interface Post {
  _id?: string;
  userId: string;
  category:
    | "algebra"
    | "aritmetica"
    | "geometria"
    | "estatistica"
    | "funcoes"
    | "outros";
  content: string;
  answers?: Answer[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Answer {
  _id?: string;
  text: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
