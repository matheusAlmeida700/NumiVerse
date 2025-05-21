import { LessonData } from "@/types/lesson";

export const lessonData: Record<string, LessonData> = {
  "algebra-1": {
    id: "algebra-1",
    title: "Expressões Algébricas",
    description:
      "Aprenda a trabalhar com expressões algébricas e suas propriedades.",
    xp: 150,
    difficulty: "iniciante",
    questions: [
      {
        id: "alg-1-q1",
        type: "multiple-choice",
        question: "Qual é o valor da expressão 3x + 2 quando x = 4?",
        answers: [
          { id: "a1", text: "14", isCorrect: true },
          { id: "a2", text: "10", isCorrect: false },
          { id: "a3", text: "18", isCorrect: false },
          { id: "a4", text: "6", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Substituindo x = 4 na expressão 3x + 2, temos 3(4) + 2 = 12 + 2 = 14.",
      },
      {
        id: "alg-1-q2",
        type: "multiple-choice",
        question: "Como podemos simplificar a expressão 5x + 3x?",
        answers: [
          { id: "a1", text: "8x", isCorrect: true },
          { id: "a2", text: "8x²", isCorrect: false },
          { id: "a3", text: "15x", isCorrect: false },
          { id: "a4", text: "2x", isCorrect: false },
        ],
        correctAnswer: "a1",
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
          { id: "a4", text: "expoentes", isCorrect: false },
        ],
        correctAnswer: "a1",
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
          { id: "a6", text: "3", isCorrect: false },
        ],
        correctAnswer: ["a1=a5", "a2=a4", "a3=a6"],
      },
      {
        id: "alg-1-q5",
        type: "drag-drop",
        question: "Organize os termos semelhantes:",
        answers: [
          { id: "a1", text: "3x", isCorrect: false },
          { id: "a2", text: "5y", isCorrect: false },
          { id: "a3", text: "2x", isCorrect: false },
          { id: "a4", text: "7y", isCorrect: false },
        ],
        correctAnswer: ["a1,a3", "a2,a4"],
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
          { id: "a6", text: "3x", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
      },
      {
        id: "alg-1-q7",
        type: "complete-number",
        question: "Se x = 3 e y = 2, qual é o valor de 2x + 3y?",
        answers: [],
        correctAnswer: "12",
      },
      {
        id: "alg-1-q8",
        type: "multiple-choice",
        question: "Qual é o grau da expressão 3x³ + 2x²y + 4y²?",
        answers: [
          { id: "a1", text: "3", isCorrect: true },
          { id: "a2", text: "5", isCorrect: false },
          { id: "a3", text: "2", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
    ],
  },
  "algebra-2": {
    id: "algebra-2",
    title: "Equações do 1º Grau",
    description: "Domine as técnicas para resolver equações de primeiro grau.",
    xp: 200,
    difficulty: "iniciante",
    questions: [
      {
        id: "alg-2-q1",
        type: "multiple-choice",
        question: "Qual é a solução da equação 2x + 3 = 7?",
        answers: [
          { id: "a1", text: "x = 2", isCorrect: true },
          { id: "a2", text: "x = 4", isCorrect: false },
          { id: "a3", text: "x = 5", isCorrect: false },
          { id: "a4", text: "x = 1", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
      {
        id: "alg-2-q2",
        type: "fill-blank",
        question:
          "Para isolar a variável em uma equação de primeiro grau, devemos deixar a variável ________ e os números __________.",
        instruction: "Complete com as palavras corretas",
        answers: [
          { id: "a1", text: "sozinha, do outro lado", isCorrect: true },
          { id: "a2", text: "agrupada, juntos", isCorrect: false },
          { id: "a3", text: "multiplicada, divididos", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
      {
        id: "alg-2-q3",
        type: "complete-number",
        question: "Resolva a equação: 3x - 4 = 8",
        answers: [],
        correctAnswer: "4",
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
          { id: "a6", text: "x = 3", isCorrect: false },
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"],
      },
      {
        id: "alg-2-q5",
        type: "drag-drop",
        question: "Organize os passos para resolver a equação 2x + 3 = 7:",
        answers: [
          { id: "a1", text: "2x + 3 = 7", isCorrect: false },
          { id: "a2", text: "2x = 4", isCorrect: false },
          { id: "a3", text: "x = 2", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
      },
      {
        id: "alg-2-q6",
        type: "multiple-choice",
        question:
          "Qual é o primeiro passo para resolver a equação 3x - 5 = 10?",
        answers: [
          { id: "a1", text: "Somar 5 em ambos os lados", isCorrect: true },
          { id: "a2", text: "Dividir ambos os lados por 3", isCorrect: false },
          { id: "a3", text: "Subtrair 10 de ambos os lados", isCorrect: false },
          {
            id: "a4",
            text: "Multiplicar ambos os lados por 3",
            isCorrect: false,
          },
        ],
        correctAnswer: "a1",
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
          { id: "a5", text: "4x = 16", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
      },
      {
        id: "alg-2-q8",
        type: "multiple-choice",
        question: "Se 2(x + 3) = 16, qual é o valor de x?",
        answers: [
          { id: "a1", text: "x = 5", isCorrect: true },
          { id: "a2", text: "x = 8", isCorrect: false },
          { id: "a3", text: "x = 10", isCorrect: false },
          { id: "a4", text: "x = 6.5", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
    ],
  },
  "aritmetica-1": {
    id: "aritmetica-1",
    title: "Números Naturais e Inteiros",
    description: "Compreenda os conjuntos numéricos e suas propriedades.",
    xp: 100,
    difficulty: "iniciante",
    questions: [
      {
        id: "arit-1-q1",
        type: "multiple-choice",
        question:
          "Qual conjunto numérico contém apenas números positivos e o zero?",
        answers: [
          { id: "a1", text: "Números naturais", isCorrect: true },
          { id: "a2", text: "Números inteiros", isCorrect: false },
          { id: "a3", text: "Números racionais", isCorrect: false },
          { id: "a4", text: "Números reais", isCorrect: false },
        ],
        correctAnswer: "a1",
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
          { id: "a6", text: "π", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
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
          { id: "a6", text: "-3, -2, -1", isCorrect: false },
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"],
      },
      {
        id: "arit-1-q4",
        type: "fill-blank",
        question:
          "O conjunto dos números inteiros é representado pela letra ________.",
        instruction: "Complete com a letra correta",
        answers: [
          { id: "a1", text: "Z", isCorrect: true },
          { id: "a2", text: "N", isCorrect: false },
          { id: "a3", text: "Q", isCorrect: false },
          { id: "a4", text: "R", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
      {
        id: "arit-1-q5",
        type: "multiple-choice",
        question: "Qual é o resultado de -7 + 12?",
        answers: [
          { id: "a1", text: "5", isCorrect: true },
          { id: "a2", text: "-5", isCorrect: false },
          { id: "a3", text: "19", isCorrect: false },
          { id: "a4", text: "-19", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
      {
        id: "arit-1-q6",
        type: "drag-drop",
        question: "Organize os números em ordem crescente:",
        answers: [
          { id: "a1", text: "-3", isCorrect: false },
          { id: "a2", text: "0", isCorrect: false },
          { id: "a3", text: "-7", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false },
        ],
        correctAnswer: ["a3", "a1", "a2", "a4"],
      },
      {
        id: "arit-1-q7",
        type: "complete-number",
        question: "Qual é o resultado de -8 × (-3)?",
        answers: [],
        correctAnswer: "24",
      },
      {
        id: "arit-1-q8",
        type: "multiple-choice",
        question: "Qual das operações abaixo resulta em um número negativo?",
        answers: [
          { id: "a1", text: "-6 × 3", isCorrect: true },
          { id: "a2", text: "-4 × (-2)", isCorrect: false },
          { id: "a3", text: "8 ÷ (-4)", isCorrect: false },
          { id: "a4", text: "-10 ÷ (-5)", isCorrect: false },
        ],
        correctAnswer: "a1",
      },
    ],
  },
  "aritmetica-2": {
    id: "aritmetica-2",
    title: "Frações e Números Decimais",
    description: "Aprenda a trabalhar com frações e números decimais.",
    xp: 150,
    difficulty: "iniciante",
    questions: [
      {
        id: "arit-2-q1",
        type: "multiple-choice",
        question: "Qual é o resultado da soma 1/4 + 2/4?",
        answers: [
          { id: "a1", text: "1/2", isCorrect: false },
          { id: "a2", text: "3/4", isCorrect: true },
          { id: "a3", text: "1", isCorrect: false },
          { id: "a4", text: "3/8", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation:
          "Como as frações têm o mesmo denominador (4), somamos os numeradores: 1/4 + 2/4 = 3/4.",
      },
      {
        id: "arit-2-q2",
        type: "true-false",
        question: "A fração 3/6 é equivalente a 1/2.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Para verificar se são equivalentes, simplificamos 3/6 dividindo numerador e denominador por 3: 3/6 = 1/2.",
      },
      {
        id: "arit-2-q3",
        type: "sort",
        question: "Organize as frações em ordem crescente.",
        instruction: "Arraste para reordenar as opções.",
        answers: [
          { id: "a1", text: "1/4", isCorrect: false },
          { id: "a2", text: "1/2", isCorrect: false },
          { id: "a3", text: "3/4", isCorrect: false },
          { id: "a4", text: "1", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "A ordem crescente correta é: 1/4 (0,25), 1/2 (0,5), 3/4 (0,75) e 1 (1,0).",
      },
      {
        id: "arit-2-q4",
        type: "sequence",
        question: "Complete a sequência de frações equivalentes a 1/2.",
        answers: [
          { id: "a1", text: "1/2", isCorrect: false },
          { id: "a2", text: "2/4", isCorrect: false },
          { id: "a3", text: "3/6", isCorrect: false },
          { id: "a4", text: "4/8", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "Todas estas frações são equivalentes a 1/2, pois ao simplificarmos, todas resultam em 1/2.",
      },
      {
        id: "arit-2-q5",
        type: "match",
        question: "Relacione as frações com seus equivalentes decimais:",
        answers: [
          { id: "a1", text: "1/4", isCorrect: false },
          { id: "a2", text: "1/2", isCorrect: false },
          { id: "a3", text: "3/4", isCorrect: false },
          { id: "a4", text: "0,25", isCorrect: false },
          { id: "a5", text: "0,5", isCorrect: false },
          { id: "a6", text: "0,75", isCorrect: false },
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"],
        explanation: "1/4 = 0,25; 1/2 = 0,5; 3/4 = 0,75",
      },
      {
        id: "arit-2-q6",
        type: "complete-number",
        question: "Qual é o resultado de 0,75 + 0,25?",
        answers: [],
        correctAnswer: "1",
        explanation: "0,75 + 0,25 = 1,00 = 1",
      },
      {
        id: "arit-2-q7",
        type: "tap-choice",
        question: "Selecione todas as frações equivalentes a 1/3.",
        answers: [
          { id: "a1", text: "2/6", isCorrect: true },
          { id: "a2", text: "3/9", isCorrect: true },
          { id: "a3", text: "4/12", isCorrect: true },
          { id: "a4", text: "2/5", isCorrect: false },
          { id: "a5", text: "1/4", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation:
          "2/6, 3/9 e 4/12 são equivalentes a 1/3 pois todas simplificam para 1/3.",
      },
      {
        id: "arit-2-q8",
        type: "drag-drop",
        question: "Arraste os números decimais em ordem decrescente:",
        answers: [
          { id: "a1", text: "0,9", isCorrect: false },
          { id: "a2", text: "0,75", isCorrect: false },
          { id: "a3", text: "0,5", isCorrect: false },
          { id: "a4", text: "0,25", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation: "A ordem decrescente é: 0,9 > 0,75 > 0,5 > 0,25",
      },
    ],
  },
  "geometria-1": {
    id: "geometria-1",
    title: "Formas Geométricas Básicas",
    description:
      "Explore propriedades de triângulos, quadriláteros e círculos.",
    xp: 150,
    difficulty: "iniciante",
    questions: [
      {
        id: "geo-1-q1",
        type: "multiple-choice",
        question: "Qual é a soma dos ângulos internos de um triângulo?",
        answers: [
          { id: "a1", text: "180°", isCorrect: true },
          { id: "a2", text: "360°", isCorrect: false },
          { id: "a3", text: "90°", isCorrect: false },
          { id: "a4", text: "270°", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "A soma dos ângulos internos de qualquer triângulo é sempre 180°.",
      },
      {
        id: "geo-1-q2",
        type: "true-false",
        question: "Todo quadrado é um retângulo.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Um quadrado é um retângulo com todos os lados iguais, portanto, todo quadrado é um retângulo.",
      },
      {
        id: "geo-1-q3",
        type: "match",
        question: "Relacione as formas geométricas com suas propriedades:",
        answers: [
          { id: "a1", text: "Triângulo", isCorrect: false },
          { id: "a2", text: "Quadrado", isCorrect: false },
          { id: "a3", text: "Círculo", isCorrect: false },
          { id: "a4", text: "3 lados", isCorrect: false },
          { id: "a5", text: "4 lados iguais", isCorrect: false },
          { id: "a6", text: "Sem lados retos", isCorrect: false },
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"],
        explanation:
          "Um triângulo tem 3 lados, um quadrado tem 4 lados iguais, e um círculo não tem lados retos.",
      },
      {
        id: "geo-1-q4",
        type: "complete-number",
        question:
          "Se um retângulo tem largura 3 cm e comprimento 5 cm, qual é sua área em cm²?",
        answers: [],
        correctAnswer: "15",
        explanation:
          "Área do retângulo = largura × comprimento = 3 × 5 = 15 cm².",
      },
      {
        id: "geo-1-q5",
        type: "tap-choice",
        question: "Selecione todos os quadriláteros:",
        answers: [
          { id: "a1", text: "Quadrado", isCorrect: true },
          { id: "a2", text: "Retângulo", isCorrect: true },
          { id: "a3", text: "Trapézio", isCorrect: true },
          { id: "a4", text: "Triângulo", isCorrect: false },
          { id: "a5", text: "Círculo", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation:
          "Quadriláteros são polígonos com 4 lados, como quadrado, retângulo e trapézio.",
      },
      {
        id: "geo-1-q6",
        type: "sequence",
        question:
          "Ordene estas figuras pelo número de lados, do menor para o maior.",
        answers: [
          { id: "a1", text: "Triângulo", isCorrect: false },
          { id: "a2", text: "Quadrado", isCorrect: false },
          { id: "a3", text: "Pentágono", isCorrect: false },
          { id: "a4", text: "Hexágono", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "Triângulo (3 lados), Quadrado (4 lados), Pentágono (5 lados), Hexágono (6 lados).",
      },
    ],
  },
  "funcoes-1": {
    id: "funcoes-1",
    title: "Introdução às Funções",
    description: "Entenda os conceitos básicos de funções matemáticas.",
    xp: 180,
    difficulty: "intermediário",
    questions: [
      {
        id: "func-1-q1",
        type: "multiple-choice",
        question: "O que define uma função matemática?",
        answers: [
          {
            id: "a1",
            text: "Uma regra que associa cada elemento do domínio a exatamente um elemento do contradomínio",
            isCorrect: true,
          },
          { id: "a2", text: "Um conjunto de números reais", isCorrect: false },
          {
            id: "a3",
            text: "Uma expressão com várias incógnitas",
            isCorrect: false,
          },
          {
            id: "a4",
            text: "Uma equação com duas variáveis",
            isCorrect: false,
          },
        ],
        correctAnswer: "a1",
        explanation:
          "Uma função é uma relação entre conjuntos onde cada elemento do domínio está associado a exatamente um elemento do contradomínio.",
      },
      {
        id: "func-1-q2",
        type: "true-false",
        question: "Na função f(x) = 2x + 1, se x = 3, então f(x) = 7.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Substituindo x = 3 na função f(x) = 2x + 1, temos f(3) = 2(3) + 1 = 6 + 1 = 7.",
      },
      {
        id: "func-1-q3",
        type: "match",
        question: "Relacione as funções com seus gráficos correspondentes:",
        answers: [
          { id: "a1", text: "f(x) = x", isCorrect: false },
          { id: "a2", text: "f(x) = x²", isCorrect: false },
          { id: "a3", text: "f(x) = |x|", isCorrect: false },
          { id: "a4", text: "Reta", isCorrect: false },
          { id: "a5", text: "Parábola", isCorrect: false },
          { id: "a6", text: "V", isCorrect: false },
        ],
        correctAnswer: ["a1=a4", "a2=a5", "a3=a6"],
        explanation:
          "A função f(x) = x é representada por uma reta, f(x) = x² por uma parábola, e f(x) = |x| tem formato de V.",
      },
      {
        id: "func-1-q4",
        type: "complete-number",
        question: "Se f(x) = 3x - 4, qual é o valor de f(4)?",
        answers: [],
        correctAnswer: "8",
        explanation: "f(4) = 3(4) - 4 = 12 - 4 = 8",
      },
      {
        id: "func-1-q5",
        type: "sequence",
        question: "Ordene os valores da função f(x) = x² para x = 0, 1, 2, 3.",
        answers: [
          { id: "a1", text: "f(0) = 0", isCorrect: false },
          { id: "a2", text: "f(1) = 1", isCorrect: false },
          { id: "a3", text: "f(2) = 4", isCorrect: false },
          { id: "a4", text: "f(3) = 9", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "f(0) = 0² = 0, f(1) = 1² = 1, f(2) = 2² = 4, f(3) = 3² = 9",
      },
    ],
  },
  "estatistica-1": {
    id: "estatistica-1",
    title: "Medidas de Tendência Central",
    description: "Aprenda a calcular e interpretar média, mediana e moda.",
    xp: 160,
    difficulty: "iniciante",
    questions: [
      {
        id: "est-1-q1",
        type: "multiple-choice",
        question: "Qual é a média dos números 4, 7, 9, 3, 7?",
        answers: [
          { id: "a1", text: "6", isCorrect: true },
          { id: "a2", text: "7", isCorrect: false },
          { id: "a3", text: "5", isCorrect: false },
          { id: "a4", text: "30", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Média = (4 + 7 + 9 + 3 + 7) ÷ 5 = 30 ÷ 5 = 6",
      },
      {
        id: "est-1-q2",
        type: "true-false",
        question:
          "A mediana de um conjunto com número par de elementos é sempre a média dos dois valores centrais.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Para um conjunto com número par de elementos, a mediana é calculada como a média dos dois valores centrais após ordenação.",
      },
      {
        id: "est-1-q3",
        type: "tap-choice",
        question: "Quais destas são medidas de tendência central?",
        answers: [
          { id: "a1", text: "Média", isCorrect: true },
          { id: "a2", text: "Mediana", isCorrect: true },
          { id: "a3", text: "Moda", isCorrect: true },
          { id: "a4", text: "Desvio padrão", isCorrect: false },
          { id: "a5", text: "Variância", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation:
          "Média, mediana e moda são medidas de tendência central, enquanto desvio padrão e variância são medidas de dispersão.",
      },
      {
        id: "est-1-q4",
        type: "sort",
        question: "Ordene os dados 8, 2, 5, 1, 9 para encontrar a mediana.",
        answers: [
          { id: "a1", text: "1", isCorrect: false },
          { id: "a2", text: "2", isCorrect: false },
          { id: "a3", text: "5", isCorrect: false },
          { id: "a4", text: "8", isCorrect: false },
          { id: "a5", text: "9", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4", "a5"],
        explanation:
          "Ordenando: 1, 2, 5, 8, 9. A mediana é o valor central: 5.",
      },
      {
        id: "est-1-q5",
        type: "complete-number",
        question:
          "Em um conjunto de 7 números com média 15, a soma dos valores é igual a:",
        answers: [],
        correctAnswer: "105",
        explanation: "Soma = média × quantidade = 15 × 7 = 105",
      },
    ],
  },
};

export const getLessonsByPlanet = (planetId: string): LessonData[] => {
  return Object.values(lessonData).filter((lesson) =>
    lesson.id.startsWith(planetId)
  );
};

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
  "geometria-5": "geometria",
};
