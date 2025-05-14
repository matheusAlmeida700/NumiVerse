
import { LessonData } from "@/types/lesson";

export const lessonData: Record<string, LessonData> = {
  "algebra-1": {
    id: "algebra-1",
    title: "Expressões Algébricas",
    description: "Aprenda a trabalhar com expressões algébricas e suas propriedades.",
    xp: 150,
    questions: [
      {
        id: "alg-1-q1",
        type: "multiple-choice",
        question: "Qual é o valor da expressão 3x + 2 quando x = 4?",
        answers: [
          { id: "a1", text: "14", isCorrect: true },
          { id: "a2", text: "10", isCorrect: false },
          { id: "a3", text: "18", isCorrect: false },
          { id: "a4", text: "6", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-1-q2",
        type: "multiple-choice",
        question: "Como podemos simplificar a expressão 5x + 3x?",
        answers: [
          { id: "a1", text: "8x", isCorrect: true },
          { id: "a2", text: "8x²", isCorrect: false },
          { id: "a3", text: "15x", isCorrect: false },
          { id: "a4", text: "2x", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-1-q3",
        type: "fill-blank",
        question: "Na expressão 2x + 3y, os números 2 e 3 são chamados de:",
        instruction: "Complete com a palavra correta",
        answers: [
          { id: "a1", text: "coeficientes", isCorrect: true },
          { id: "a2", text: "variáveis", isCorrect: false },
          { id: "a3", text: "termos", isCorrect: false },
          { id: "a4", text: "expoentes", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-1-q4",
        type: "match",
        question: "Relacione as expressões com os resultados quando x = 2:",
        answers: [
          { id: "a1", text: "3x + 1", isCorrect: false },
          { id: "a2", text: "x² + x", isCorrect: false },
          { id: "a3", text: "2x - 1", isCorrect: false },
          { id: "a4", text: "7", isCorrect: false },
          { id: "a5", text: "6", isCorrect: false },
          { id: "a6", text: "3", isCorrect: false }
        ],
        correctAnswer: ["a1=a5", "a2=a4", "a3=a6"]
      },
      {
        id: "alg-1-q5",
        type: "drag-drop",
        question: "Organize os termos semelhantes:",
        answers: [
          { id: "a1", text: "3x", isCorrect: false },
          { id: "a2", text: "5y", isCorrect: false },
          { id: "a3", text: "2x", isCorrect: false },
          { id: "a4", text: "7y", isCorrect: false }
        ],
        correctAnswer: ["a1,a3", "a2,a4"]
      },
      {
        id: "alg-1-q6",
        type: "tap-choice",
        question: "Selecione todos os termos da expressão 2x² + 3xy - 5y + 7:",
        answers: [
          { id: "a1", text: "2x²", isCorrect: true },
          { id: "a2", text: "3xy", isCorrect: true },
          { id: "a3", text: "-5y", isCorrect: true },
          { id: "a4", text: "7", isCorrect: true },
          { id: "a5", text: "x²", isCorrect: false },
          { id: "a6", text: "3x", isCorrect: false }
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"]
      },
      {
        id: "alg-1-q7",
        type: "complete-number",
        question: "Se x = 3 e y = 2, qual é o valor de 2x + 3y?",
        answers: [],
        correctAnswer: "12"
      },
      {
        id: "alg-1-q8",
        type: "multiple-choice",
        question: "Qual é o grau da expressão 3x³ + 2x²y + 4y²?",
        answers: [
          { id: "a1", text: "3", isCorrect: true },
          { id: "a2", text: "5", isCorrect: false },
          { id: "a3", text: "2", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false }
        ],
        correctAnswer: "a1"
      }
    ]
  },
  "algebra-2": {
    id: "algebra-2",
    title: "Equações do 1º Grau",
    description: "Domine as técnicas para resolver equações de primeiro grau.",
    xp: 200,
    questions: [
      {
        id: "alg-2-q1",
        type: "multiple-choice",
        question: "Qual é a solução da equação 2x + 3 = 7?",
        answers: [
          { id: "a1", text: "x = 2", isCorrect: true },
          { id: "a2", text: "x = 4", isCorrect: false },
          { id: "a3", text: "x = 5", isCorrect: false },
          { id: "a4", text: "x = 1", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-2-q2",
        type: "fill-blank",
        question: "Para isolar a variável em uma equação de primeiro grau, devemos deixar a variável ________ e os números __________.",
        instruction: "Complete com as palavras corretas",
        answers: [
          { id: "a1", text: "sozinha, do outro lado", isCorrect: true },
          { id: "a2", text: "agrupada, juntos", isCorrect: false },
          { id: "a3", text: "multiplicada, divididos", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-2-q3",
        type: "complete-number",
        question: "Resolva a equação: 3x - 4 = 8",
        answers: [],
        correctAnswer: "4"
      },
      {
        id: "alg-2-q4",
        type: "match",
        question: "Relacione as equações com suas soluções:",
        answers: [
          { id: "a1", text: "x + 5 = 9", isCorrect: false },
          { id: "a2", text: "2x - 3 = 5", isCorrect: false },
          { id: "a3", text: "3x + 2 = 11", isCorrect: false },
          { id: "a4", text: "x = 4", isCorrect: false },
          { id: "a5", text: "x = 4", isCorrect: false },
          { id: "a6", text: "x = 3", isCorrect: false }
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"]
      },
      {
        id: "alg-2-q5",
        type: "drag-drop",
        question: "Organize os passos para resolver a equação 2x + 3 = 7:",
        answers: [
          { id: "a1", text: "2x + 3 = 7", isCorrect: false },
          { id: "a2", text: "2x = 4", isCorrect: false },
          { id: "a3", text: "x = 2", isCorrect: false }
        ],
        correctAnswer: ["a1", "a2", "a3"]
      },
      {
        id: "alg-2-q6",
        type: "multiple-choice",
        question: "Qual é o primeiro passo para resolver a equação 3x - 5 = 10?",
        answers: [
          { id: "a1", text: "Somar 5 em ambos os lados", isCorrect: true },
          { id: "a2", text: "Dividir ambos os lados por 3", isCorrect: false },
          { id: "a3", text: "Subtrair 10 de ambos os lados", isCorrect: false },
          { id: "a4", text: "Multiplicar ambos os lados por 3", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "alg-2-q7",
        type: "tap-choice",
        question: "Selecione as equações que têm solução x = 3:",
        answers: [
          { id: "a1", text: "x + 2 = 5", isCorrect: true },
          { id: "a2", text: "2x = 6", isCorrect: true },
          { id: "a3", text: "3x - 6 = 3", isCorrect: true },
          { id: "a4", text: "x - 1 = 5", isCorrect: false },
          { id: "a5", text: "4x = 16", isCorrect: false }
        ],
        correctAnswer: ["a1", "a2", "a3"]
      },
      {
        id: "alg-2-q8",
        type: "multiple-choice",
        question: "Se 2(x + 3) = 16, qual é o valor de x?",
        answers: [
          { id: "a1", text: "x = 5", isCorrect: true },
          { id: "a2", text: "x = 8", isCorrect: false },
          { id: "a3", text: "x = 10", isCorrect: false },
          { id: "a4", text: "x = 6.5", isCorrect: false }
        ],
        correctAnswer: "a1"
      }
    ]
  },
  "aritmetica-1": {
    id: "aritmetica-1",
    title: "Números Naturais e Inteiros",
    description: "Compreenda os conjuntos numéricos e suas propriedades.",
    xp: 100,
    questions: [
      {
        id: "arit-1-q1",
        type: "multiple-choice",
        question: "Qual conjunto numérico contém apenas números positivos e o zero?",
        answers: [
          { id: "a1", text: "Números naturais", isCorrect: true },
          { id: "a2", text: "Números inteiros", isCorrect: false },
          { id: "a3", text: "Números racionais", isCorrect: false },
          { id: "a4", text: "Números reais", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "arit-1-q2",
        type: "tap-choice",
        question: "Selecione todos os números inteiros:",
        answers: [
          { id: "a1", text: "-5", isCorrect: true },
          { id: "a2", text: "0", isCorrect: true },
          { id: "a3", text: "7", isCorrect: true },
          { id: "a4", text: "3,5", isCorrect: false },
          { id: "a5", text: "½", isCorrect: false },
          { id: "a6", text: "π", isCorrect: false }
        ],
        correctAnswer: ["a1", "a2", "a3"]
      },
      {
        id: "arit-1-q3",
        type: "match",
        question: "Relacione os conjuntos numéricos com seus exemplos:",
        answers: [
          { id: "a1", text: "Números Naturais", isCorrect: false },
          { id: "a2", text: "Números Inteiros", isCorrect: false },
          { id: "a3", text: "Números que não são naturais", isCorrect: false },
          { id: "a4", text: "0, 1, 2, 3...", isCorrect: false },
          { id: "a5", text: "...-2, -1, 0, 1, 2...", isCorrect: false },
          { id: "a6", text: "-3, -2, -1", isCorrect: false }
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"]
      },
      {
        id: "arit-1-q4",
        type: "fill-blank",
        question: "O conjunto dos números inteiros é representado pela letra ________.",
        instruction: "Complete com a letra correta",
        answers: [
          { id: "a1", text: "Z", isCorrect: true },
          { id: "a2", text: "N", isCorrect: false },
          { id: "a3", text: "Q", isCorrect: false },
          { id: "a4", text: "R", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "arit-1-q5",
        type: "multiple-choice",
        question: "Qual é o resultado de -7 + 12?",
        answers: [
          { id: "a1", text: "5", isCorrect: true },
          { id: "a2", text: "-5", isCorrect: false },
          { id: "a3", text: "19", isCorrect: false },
          { id: "a4", text: "-19", isCorrect: false }
        ],
        correctAnswer: "a1"
      },
      {
        id: "arit-1-q6",
        type: "drag-drop",
        question: "Organize os números em ordem crescente:",
        answers: [
          { id: "a1", text: "-3", isCorrect: false },
          { id: "a2", text: "0", isCorrect: false },
          { id: "a3", text: "-7", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false }
        ],
        correctAnswer: ["a3", "a1", "a2", "a4"]
      },
      {
        id: "arit-1-q7",
        type: "complete-number",
        question: "Qual é o resultado de -8 × (-3)?",
        answers: [],
        correctAnswer: "24"
      },
      {
        id: "arit-1-q8",
        type: "multiple-choice",
        question: "Qual das operações abaixo resulta em um número negativo?",
        answers: [
          { id: "a1", text: "-6 × 3", isCorrect: true },
          { id: "a2", text: "-4 × (-2)", isCorrect: false },
          { id: "a3", text: "8 ÷ (-4)", isCorrect: false },
          { id: "a4", text: "-10 ÷ (-5)", isCorrect: false }
        ],
        correctAnswer: "a1"
      }
    ]
  }
  // Outros conjuntos de lições serão adicionados de forma similar para cada tópico
};

// Função auxiliar para obter conjuntos de lições por planeta
export const getLessonsByPlanet = (planetId: string): LessonData[] => {
  return Object.values(lessonData).filter(lesson => lesson.id.startsWith(planetId));
};

// Mapeamento de IDs de lições para IDs de planetas
export const lessonToPlanetMap: Record<string, string> = {
  "algebra-1": "algebra",
  "algebra-2": "algebra",
  "algebra-3": "algebra",
  "algebra-4": "algebra",
  "algebra-5": "algebra",
  "aritmetica-1": "aritmetica",
  "aritmetica-2": "aritmetica",
  "aritmetica-3": "aritmetica",
  "aritmetica-4": "aritmetica",
  "aritmetica-5": "aritmetica",
  "estatistica-1": "estatistica",
  "estatistica-2": "estatistica",
  "estatistica-3": "estatistica",
  "estatistica-4": "estatistica",
  "estatistica-5": "estatistica",
  "funcoes-1": "funcoes",
  "funcoes-2": "funcoes",
  "funcoes-3": "funcoes",
  "funcoes-4": "funcoes",
  "funcoes-5": "funcoes",
  "geometria-1": "geometria",
  "geometria-2": "geometria",
  "geometria-3": "geometria",
  "geometria-4": "geometria",
  "geometria-5": "geometria"
};
