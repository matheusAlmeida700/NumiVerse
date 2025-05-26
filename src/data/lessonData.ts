import { LessonData } from "@/types/lesson";

export const lessonData: Record<string, LessonData> = {
  "algebra-1": {
    id: "algebra-1",
    title: "Expressões Algébricas",
    description:
      "Aprenda a trabalhar com expressões algébricas e suas propriedades.",
    xp: 15,
    difficulty: "iniciante",
    questions: [
      {
        id: "alg-1-q1",
        type: "multiple-choice",
        question: "Qual é o valor de x na expressão 3x = 15?",
        answers: [
          { id: "a1", text: "3", isCorrect: false },
          { id: "a2", text: "4", isCorrect: false },
          { id: "a3", text: "5", isCorrect: true },
          { id: "a4", text: "6", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "3x = 15 → x = 15 ÷ 3 → x = 5",
      },
      {
        id: "alg-1-q2",
        type: "multiple-choice",
        question:
          "Qual expressão representa “o triplo de um número somado com 2”?",
        answers: [
          { id: "a1", text: "3x – 2", isCorrect: false },
          { id: "a2", text: "3x + 2", isCorrect: true },
          { id: "a3", text: "x + 3 + 2", isCorrect: false },
          { id: "a4", text: "2x + 3", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation:
          "Triplo de um número = 3x → Somado com 2 = 3x + 2 → Expressão correta: 3x + 2",
      },
      {
        id: "alg-1-q3",
        type: "multiple-choice",
        question: "Se x = 4, quanto vale a expressão: 2x² – 3x?",
        answers: [
          { id: "a1", text: "20", isCorrect: true },
          { id: "a2", text: "26", isCorrect: false },
          { id: "a3", text: "28", isCorrect: false },
          { id: "a4", text: "32", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "20 → (2×16 – 3×4 = 32 – 12 = 20)",
      },
      {
        id: "alg-1-q4",
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
        explanation:
          "Os números que multiplicam as variáveis são chamados de coeficientes. Assim, 2 e 3 são coeficientes de x e y, respectivamente.",
      },
      {
        id: "alg-1-q5",
        type: "multiple-choice",
        question: "Qual é a solução da equação: 2x – 5 = 9?",
        answers: [
          { id: "a1", text: "x = 2", isCorrect: false },
          { id: "a2", text: "x = 6", isCorrect: false },
          { id: "a3", text: "x = 7", isCorrect: true },
          { id: "a4", text: "x = 8", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "Some 5 dos dois lados: 2x = 14 → Divida por 2: x = 7.",
      },
    ],
  },
  "algebra-2": {
    id: "algebra-2",
    title: "Equações do 1º Grau",
    description: "Domine as técnicas para resolver equações de primeiro grau.",
    xp: 15,
    difficulty: "iniciante",
    questions: [
      {
        id: "alg-2-q1",
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
        explanation:
          "Os termos de uma expressão são os elementos separados por sinais de + ou −. Aqui temos quatro termos: 2x², 3xy, -5y e 7.",
      },
      {
        id: "alg-2-q2",
        type: "complete-number",
        question: "Se x = 3 e y = 2, qual é o valor de 2x + 3y?",
        answers: [],
        correctAnswer: "12",
        explanation: "Substituindo: 2×3 + 3×2 = 6 + 6 = 12.",
      },
      {
        id: "alg-2-q3",
        type: "multiple-choice",
        question: "Qual é o grau da expressão 3x³ + 2x²y + 4y²?",
        answers: [
          { id: "a1", text: "3", isCorrect: true },
          { id: "a2", text: "5", isCorrect: false },
          { id: "a3", text: "2", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "O grau de um polinômio é o maior grau entre seus termos. 3x³ tem grau 3, 2x²y tem grau 3 (2+1), 4y² tem grau 2. Grau máximo: 3.",
      },
      {
        id: "alg-2-q4",
        type: "multiple-choice",
        question:
          "Lucas tem o dobro da idade de Ana. Daqui a 4 anos, a soma das idades deles será 40. Qual a idade atual de Ana?",
        answers: [
          { id: "a1", text: "8 anos", isCorrect: false },
          { id: "a2", text: "14 anos", isCorrect: false },
          { id: "a3", text: "12 anos", isCorrect: false },
          { id: "a4", text: "10 anos", isCorrect: true },
        ],
        correctAnswer: "a4",
        explanation:
          "Se Ana tem x anos, Lucas tem 2x. Daqui a 4 anos: x+4 + 2x+4 = 40 → 3x + 8 = 40 → 3x = 32 → x = 10.",
      },
      {
        id: "alg-2-q5",
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
        explanation:
          "Isolar a variável significa deixá-la sozinha em um lado da equação e mover os números para o outro lado.",
      },
    ],
  },
  "algebra-3": {
    id: "algebra-3",
    title: "Equações do 2º Grau",
    description:
      "Aprenda a resolver equações quadráticas usando fatoração, fórmula de Bhaskara e outras estratégias.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "alg-3-q1",
        type: "multiple-choice",
        question: "Qual é a forma geral de uma equação do 2º grau?",
        answers: [
          { id: "a1", text: "ax² + bx + c = 0", isCorrect: true },
          { id: "a2", text: "ax + b = 0", isCorrect: false },
          { id: "a3", text: "ax² = c", isCorrect: false },
          { id: "a4", text: "a(x + b)² = 0", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "A forma geral de uma equação do 2º grau é ax² + bx + c = 0, onde a ≠ 0.",
      },
      {
        id: "alg-3-q2",
        type: "complete-number",
        question: "Resolva a equação: x² - 5x + 6 = 0",
        answers: [],
        correctAnswer: "2 e 3",
        explanation: "Fatorando: (x - 2)(x - 3) = 0 → x = 2 ou x = 3.",
      },
      {
        id: "alg-3-q3",
        type: "multiple-choice",
        question: "Qual é o valor de x na equação x² = 49?",
        answers: [
          { id: "a1", text: "x = 7", isCorrect: false },
          { id: "a2", text: "x = -7", isCorrect: false },
          { id: "a3", text: "x = ±7", isCorrect: true },
          { id: "a4", text: "x = 0", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "x² = 49 → x = ±√49 → x = ±7.",
      },
      {
        id: "alg-3-q4",
        type: "tap-choice",
        question: "Quais dessas equações têm raízes reais?",
        answers: [
          { id: "a1", text: "x² - 4x + 4 = 0", isCorrect: true },
          { id: "a2", text: "x² + x + 1 = 0", isCorrect: false },
          { id: "a3", text: "x² - 9 = 0", isCorrect: true },
          { id: "a4", text: "x² + 2x + 5 = 0", isCorrect: false },
          { id: "a5", text: "x² - 1 = 0", isCorrect: true },
        ],
        correctAnswer: ["a1", "a3", "a5"],
        explanation:
          "As equações com Δ ≥ 0 têm raízes reais. Δ de x² - 4x + 4 = 0, x² - 9 = 0 e x² - 1 = 0 são maiores ou iguais a 0.",
      },
    ],
  },
  "algebra-4": {
    id: "algebra-4",
    title: "Produtos Notáveis",
    description:
      "Identifique padrões como quadrado da soma, quadrado da diferença e produto da soma pela diferença.",
    xp: 45,
    difficulty: "avançado",
    questions: [
      {
        id: "alg-4-q1",
        type: "multiple-choice",
        question: "Qual é o resultado de (a + b)²?",
        answers: [
          { id: "a1", text: "a² + b²", isCorrect: false },
          { id: "a2", text: "a² + 2ab + b²", isCorrect: true },
          { id: "a3", text: "2a² + b²", isCorrect: false },
          { id: "a4", text: "a² - 2ab + b²", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation:
          "(a + b)² = a² + 2ab + b². É um produto notável: quadrado da soma.",
      },
      {
        id: "alg-4-q2",
        type: "complete-number",
        question: "Complete: (3x - 2)² =",
        answers: [],
        correctAnswer: "9x² - 12x + 4",
        explanation: "(3x - 2)² = (3x)² - 2×3x×2 + 2² = 9x² - 12x + 4.",
      },
      {
        id: "alg-4-q3",
        type: "tap-choice",
        question: "Quais expressões representam produtos notáveis?",
        answers: [
          { id: "a1", text: "(x + y)²", isCorrect: true },
          { id: "a2", text: "(x - y)(x + y)", isCorrect: true },
          { id: "a3", text: "x² + y", isCorrect: false },
          { id: "a4", text: "(x + 1)(x + 2)", isCorrect: false },
          { id: "a5", text: "(x - y)²", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a5"],
        explanation:
          "Produtos notáveis incluem: (x+y)² = x²+2xy+y², (x−y)(x+y) = x²−y², (x−y)² = x²−2xy+y².",
      },
    ],
  },
  "aritmetica-1": {
    id: "aritmetica-1",
    title: "Números Naturais e Inteiros",
    description: "Compreenda os conjuntos numéricos e suas propriedades.",
    xp: 15,
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
        explanation:
          "Os números naturais incluem 0, 1, 2, 3... e não admitem negativos.",
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
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation:
          "Números inteiros incluem negativos, zero e positivos, mas não frações ou decimais.",
      },
      {
        id: "arit-1-q3",
        type: "fill-blank",
        question:
          "O conjunto dos números inteiros é representado pela letra ________.",
        instruction: "Complete com a letra correta.",
        answers: [
          { id: "a1", text: "R", isCorrect: false },
          { id: "a2", text: "N", isCorrect: false },
          { id: "a3", text: "Q", isCorrect: false },
          { id: "a4", text: "Z", isCorrect: true },
        ],
        correctAnswer: "a4",
        explanation:
          "A letra 'Z' representa os números inteiros, incluindo negativos e positivos.",
      },
      {
        id: "arit-1-q4",
        type: "complete-number",
        question: "Qual é o resultado de -8 × (-3)?",
        answers: [],
        correctAnswer: "24",
        explanation:
          "Multiplicação entre dois negativos resulta em número positivo: -8 × -3 = 24.",
      },
      {
        id: "arit-1-q5",
        type: "true-false",
        question: "Todo número natural é também um número inteiro.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "O conjunto dos inteiros contém todos os naturais, mais os negativos.",
      },
    ],
  },
  "aritmetica-2": {
    id: "aritmetica-2",
    title: "Frações e Números Decimais",
    description: "Aprenda a trabalhar com frações e números decimais.",
    xp: 15,
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
          "Denominadores iguais, basta somar os numeradores: 1+2 = 3 → 3/4.",
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
        explanation: "3/6 dividido por 3 dá 1/2.",
      },
      {
        id: "arit-2-q3",
        type: "complete-number",
        question: "Qual é o resultado de 0,75 + 0,25?",
        answers: [],
        correctAnswer: "1",
        explanation: "0,75 + 0,25 = 1",
      },
    ],
  },
  "aritmetica-3": {
    id: "aritmetica-3",
    title: "Potenciação e Raízes",
    description: "Entenda como funcionam potências e raízes quadradas.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "arit-3-q1",
        type: "multiple-choice",
        question: "Qual é o valor de 3²?",
        answers: [
          { id: "a1", text: "6", isCorrect: false },
          { id: "a2", text: "9", isCorrect: true },
          { id: "a3", text: "12", isCorrect: false },
          { id: "a4", text: "27", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation: "3² = 3 × 3 = 9.",
      },
      {
        id: "arit-3-q2",
        type: "complete-number",
        question: "√49 é igual a?",
        answers: [],
        correctAnswer: "7",
        explanation: "Raiz quadrada de 49 é 7, pois 7 × 7 = 49.",
      },
      {
        id: "arit-3-q3",
        type: "true-false",
        question: "10² é igual a 100.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "10 × 10 = 100.",
      },
      {
        id: "arit-3-q4",
        type: "tap-choice",
        question: "Marque todas as potências de 2:",
        answers: [
          { id: "a1", text: "4", isCorrect: true },
          { id: "a2", text: "8", isCorrect: true },
          { id: "a3", text: "9", isCorrect: false },
          { id: "a4", text: "16", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation: "2² = 4, 2³ = 8, 2⁴ = 16.",
      },
      {
        id: "arit-3-q5",
        type: "fill-blank",
        question: "O resultado de 5³ é ________.",
        instruction: "Complete com o número correto.",
        answers: [
          { id: "a1", text: "125", isCorrect: true },
          { id: "a2", text: "15", isCorrect: false },
          { id: "a3", text: "25", isCorrect: false },
          { id: "a4", text: "100", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "5 × 5 × 5 = 125.",
      },
    ],
  },
  "aritmetica-4": {
    id: "aritmetica-4",
    title: "Múltiplos e Divisores",
    description: "Aprenda a identificar múltiplos e divisores.",
    xp: 45,
    difficulty: "avançado",
    questions: [
      {
        id: "arit-4-q1",
        type: "multiple-choice",
        question: "Qual dos seguintes números é múltiplo de 6?",
        answers: [
          { id: "a1", text: "18", isCorrect: true },
          { id: "a2", text: "20", isCorrect: false },
          { id: "a3", text: "25", isCorrect: false },
          { id: "a4", text: "11", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "18 é divisível por 6: 6 × 3 = 18.",
      },
      {
        id: "arit-4-q2",
        type: "complete-number",
        question: "O menor múltiplo comum entre 4 e 6 é?",
        answers: [],
        correctAnswer: "12",
        explanation: "Múltiplos: 4 (4, 8, 12...), 6 (6, 12...), M.M.C = 12.",
      },
      {
        id: "arit-4-q3",
        type: "true-false",
        question: "Todo número é divisor de si mesmo.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Ex: 5 ÷ 5 = 1, então todo número é divisor de si mesmo.",
      },
      {
        id: "arit-4-q4",
        type: "tap-choice",
        question: "Marque todos os divisores de 12:",
        answers: [
          { id: "a1", text: "2", isCorrect: true },
          { id: "a2", text: "3", isCorrect: true },
          { id: "a3", text: "5", isCorrect: false },
          { id: "a4", text: "6", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation: "12 ÷ 2 = 6; 12 ÷ 3 = 4; 12 ÷ 6 = 2.",
      },
      {
        id: "arit-4-q5",
        type: "fill-blank",
        question: "O número ________ é divisor de todos os números.",
        instruction: "Preencha com o menor número positivo.",
        answers: [
          { id: "a1", text: "1", isCorrect: true },
          { id: "a2", text: "2", isCorrect: false },
          { id: "a3", text: "0", isCorrect: false },
          { id: "a4", text: "10", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "1 divide qualquer número: ex: 1 ÷ n = n.",
      },
    ],
  },
  "geometria-1": {
    id: "geometria-1",
    title: "Formas Geométricas Básicas",
    description:
      "Explore propriedades de triângulos, quadriláteros e círculos.",
    xp: 15,
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
        type: "complete-number",
        question:
          "Se um retângulo tem largura 3 cm e comprimento 5 cm, qual é sua área em cm²?",
        answers: [],
        correctAnswer: "15",
        explanation:
          "Área do retângulo = largura × comprimento = 3 × 5 = 15 cm².",
      },
      {
        id: "geo-1-q4",
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
    ],
  },
  "geometria-2": {
    id: "geometria-2",
    title: "Perímetro e Área",
    description:
      "Aprenda a calcular o perímetro e a área de diferentes figuras planas.",
    xp: 15,
    difficulty: "iniciante",
    questions: [
      {
        id: "geo-2-q1",
        type: "multiple-choice",
        question: "Qual é o perímetro de um quadrado com lados de 4 cm?",
        answers: [
          { id: "a1", text: "16 cm", isCorrect: true },
          { id: "a2", text: "8 cm", isCorrect: false },
          { id: "a3", text: "12 cm", isCorrect: false },
          { id: "a4", text: "4 cm", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "O perímetro do quadrado é 4 × lado = 4 × 4 = 16 cm.",
      },
      {
        id: "geo-2-q2",
        type: "true-false",
        question:
          "A área de um triângulo é sempre igual ao produto da base pela altura.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: false },
          { id: "a2", text: "Falso", isCorrect: true },
        ],
        correctAnswer: "a2",
        explanation:
          "A área de um triângulo é (base × altura) ÷ 2, não apenas o produto.",
      },
      {
        id: "geo-2-q3",
        type: "complete-number",
        question: "Qual é a área de um círculo com raio 2 cm? (Use π ≈ 3,14)",
        answers: [],
        correctAnswer: "12.56",
        explanation: "Área = π × r² = 3,14 × 2² = 3,14 × 4 = 12,56 cm².",
      },
      {
        id: "geo-2-q4",
        type: "tap-choice",
        question:
          "Selecione todas as figuras cuja fórmula da área envolve multiplicação.",
        answers: [
          { id: "a1", text: "Triângulo", isCorrect: true },
          { id: "a2", text: "Quadrado", isCorrect: true },
          { id: "a3", text: "Retângulo", isCorrect: true },
          { id: "a4", text: "Círculo", isCorrect: true },
          { id: "a5", text: "Ponto", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "Todas essas figuras têm fórmulas que envolvem multiplicação de medidas.",
      },
      {
        id: "geo-2-q1",
        type: "multiple-choice",
        question:
          "Um triângulo tem lados de 5 cm, 5 cm e 8 cm. Determine se o triângulo é isósceles, equilátero ou escaleno.",
        answers: [
          { id: "a1", text: "Equilátero", isCorrect: false },
          { id: "a2", text: "Escaleno", isCorrect: false },
          { id: "a3", text: "Isósceles", isCorrect: true },
          { id: "a4", text: "Retângulo", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "Triângulo isósceles é aquele que tem dois lados iguais.",
      },
    ],
  },
  "geometria-3": {
    id: "geometria-3",
    title: "Simetria e Figuras Planas",
    description:
      "Identifique e analise simetrias em diferentes formas geométricas.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "geo-3-q1",
        type: "multiple-choice",
        question: "Quantos eixos de simetria tem um círculo?",
        answers: [
          { id: "a1", text: "1", isCorrect: false },
          { id: "a2", text: "2", isCorrect: false },
          { id: "a3", text: "Infinitos", isCorrect: true },
          { id: "a4", text: "Nenhum", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "O círculo possui infinitos eixos de simetria.",
      },
      {
        id: "geo-3-q2",
        type: "true-false",
        question: "Um retângulo possui simetria apenas horizontal.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: false },
          { id: "a2", text: "Falso", isCorrect: true },
        ],
        correctAnswer: "a2",
        explanation: "Um retângulo possui simetria horizontal e vertical.",
      },
      {
        id: "geo-3-q3",
        type: "complete-number",
        question: "Quantos eixos de simetria tem um quadrado?",
        answers: [],
        correctAnswer: "4",
        explanation:
          "O quadrado possui 4 eixos de simetria: 2 diagonais e 2 medianas.",
      },
      {
        id: "geo-3-q4",
        type: "tap-choice",
        question: "Quais figuras possuem pelo menos um eixo de simetria?",
        answers: [
          { id: "a1", text: "Círculo", isCorrect: true },
          { id: "a2", text: "Retângulo", isCorrect: true },
          { id: "a3", text: "Trapézio escaleno", isCorrect: false },
          { id: "a4", text: "Triângulo equilátero", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation:
          "Trapézios escalenos não têm simetria, ao contrário das outras figuras.",
      },
      {
        id: "geo-3-q5",
        type: "sequence",
        question:
          "Ordene as figuras pela quantidade de eixos de simetria (do menor ao maior).",
        answers: [
          { id: "a1", text: "Triângulo escaleno", isCorrect: false },
          { id: "a2", text: "Retângulo", isCorrect: false },
          { id: "a3", text: "Quadrado", isCorrect: false },
          { id: "a4", text: "Círculo", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "Triângulo escaleno (0), retângulo (2), quadrado (4), círculo (infinitos).",
      },
    ],
  },
  "geometria-4": {
    id: "geometria-4",
    title: "Ângulos",
    description:
      "Classifique e calcule ângulos em diferentes contextos geométricos.",
    xp: 45,
    difficulty: "avançado",
    questions: [
      {
        id: "geo-4-q1",
        type: "multiple-choice",
        question: "Qual é a medida de um ângulo reto?",
        answers: [
          { id: "a1", text: "45°", isCorrect: false },
          { id: "a2", text: "90°", isCorrect: true },
          { id: "a3", text: "180°", isCorrect: false },
          { id: "a4", text: "360°", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation: "Um ângulo reto mede exatamente 90°.",
      },
      {
        id: "geo-4-q2",
        type: "true-false",
        question: "Um ângulo agudo é maior que 90°.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: false },
          { id: "a2", text: "Falso", isCorrect: true },
        ],
        correctAnswer: "a2",
        explanation: "Ângulos agudos medem menos de 90°.",
      },
      {
        id: "geo-4-q3",
        type: "complete-number",
        question: "Qual é a medida de um ângulo raso?",
        answers: [],
        correctAnswer: "180",
        explanation: "Ângulos rasos medem 180°.",
      },
      {
        id: "geo-4-q4",
        type: "tap-choice",
        question: "Selecione todos os ângulos maiores que 90°:",
        answers: [
          { id: "a1", text: "45°", isCorrect: false },
          { id: "a2", text: "90°", isCorrect: false },
          { id: "a3", text: "120°", isCorrect: true },
          { id: "a4", text: "180°", isCorrect: true },
          { id: "a5", text: "200°", isCorrect: true },
        ],
        correctAnswer: ["a3", "a4", "a5"],
        explanation: "Ângulos maiores que 90° são chamados obtusos ou rasos.",
      },
      {
        id: "geo-4-q5",
        type: "sequence",
        question: "Ordene os ângulos do menor para o maior.",
        answers: [
          { id: "a1", text: "30°", isCorrect: false },
          { id: "a2", text: "90°", isCorrect: false },
          { id: "a3", text: "120°", isCorrect: false },
          { id: "a4", text: "180°", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation: "Ordem crescente dos ângulos: 30°, 90°, 120°, 180°.",
      },
    ],
  },
  "geometria-5": {
    id: "geometria-5",
    title: "Polígonos",
    description: "Identifique polígonos, seus lados e propriedades.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "geo-5-q1",
        type: "multiple-choice",
        question: "Quantos lados tem um hexágono?",
        answers: [
          { id: "a1", text: "5", isCorrect: false },
          { id: "a2", text: "6", isCorrect: true },
          { id: "a3", text: "7", isCorrect: false },
          { id: "a4", text: "8", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation: "Hexágonos têm 6 lados.",
      },
      {
        id: "geo-5-q2",
        type: "true-false",
        question: "Todo polígono regular tem lados e ângulos iguais.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Essa é a definição de polígono regular.",
      },
      {
        id: "geo-5-q3",
        type: "complete-number",
        question: "Quantos lados tem um decágono?",
        answers: [],
        correctAnswer: "10",
        explanation: "Decágono é o polígono com 10 lados.",
      },
      {
        id: "geo-5-q4",
        type: "tap-choice",
        question: "Selecione os polígonos regulares abaixo:",
        answers: [
          { id: "a1", text: "Triângulo equilátero", isCorrect: true },
          { id: "a2", text: "Quadrado", isCorrect: true },
          { id: "a3", text: "Retângulo", isCorrect: false },
          { id: "a4", text: "Pentágono irregular", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2"],
        explanation: "Polígonos regulares têm todos os lados e ângulos iguais.",
      },
      {
        id: "geo-5-q5",
        type: "sequence",
        question:
          "Ordene os polígonos pelo número de lados (menor para maior).",
        answers: [
          { id: "a1", text: "Triângulo", isCorrect: false },
          { id: "a2", text: "Quadrado", isCorrect: false },
          { id: "a3", text: "Pentágono", isCorrect: false },
          { id: "a4", text: "Hexágono", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4"],
        explanation:
          "Triângulo (3), quadrado (4), pentágono (5), hexágono (6).",
      },
    ],
  },
  "funcoes-1": {
    id: "funcoes-1",
    title: "O que é uma Função?",
    description:
      "Aprenda a identificar e compreender o conceito fundamental de funções.",
    xp: 15,
    difficulty: "iniciante",
    questions: [
      {
        id: "func-1-q1",
        type: "multiple-choice",
        question: "Qual das alternativas representa corretamente uma função?",
        answers: [
          { id: "a1", text: "(1,2), (2,3), (3,4)", isCorrect: true },
          { id: "a2", text: "(1,2), (1,3), (2,4)", isCorrect: false },
          { id: "a3", text: "(3,4), (4,3), (5,3)", isCorrect: true },
          { id: "a4", text: "(2,3), (3,2), (2,4)", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Cada valor de entrada (x) deve estar ligado a apenas um valor de saída (y).",
      },
      {
        id: "func-1-q2",
        type: "true-false",
        question:
          "Toda função é uma relação, mas nem toda relação é uma função.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Funções são um tipo específico de relação, com uma única saída para cada entrada.",
      },
      {
        id: "func-1-q3",
        type: "complete-number",
        question: "Se f(x) = x + 4, quanto vale f(7)?",
        answers: [],
        correctAnswer: "11",
        explanation: "f(7) = 7 + 4 = 11.",
      },
      {
        id: "func-1-q4",
        type: "tap-choice",
        question: "Selecione todos os exemplos de funções válidas:",
        answers: [
          { id: "a1", text: "f(x) = 2x + 1", isCorrect: true },
          { id: "a2", text: "f(x) = √x", isCorrect: true },
          { id: "a3", text: "f(x) = ±x", isCorrect: false },
          { id: "a4", text: "f(x) = x² + 2x", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation:
          "Funções devem ter uma única saída para cada entrada do domínio.",
      },
    ],
  },
  "funcoes-2": {
    id: "funcoes-2",
    title: "Calculando Valores de Funções",
    description: "Aprenda a avaliar funções e construir tabelas de valores.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "func-2-q1",
        type: "multiple-choice",
        question: "Se f(x) = 5x - 2, qual o valor de f(2)?",
        answers: [
          { id: "a1", text: "8", isCorrect: true },
          { id: "a2", text: "10", isCorrect: false },
          { id: "a3", text: "12", isCorrect: false },
          { id: "a4", text: "7", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "f(2) = 5×2 - 2 = 10 - 2 = 8.",
      },
      {
        id: "func-2-q2",
        type: "true-false",
        question: "A função f(x) = x² sempre produz resultados positivos.",
        answers: [
          { id: "a1", text: "Falso", isCorrect: true },
          { id: "a2", text: "Verdadeiro", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "f(0) = 0, que não é positivo. Portanto, a afirmação é falsa.",
      },
      {
        id: "func-2-q3",
        type: "complete-number",
        question: "Se f(x) = x/2, qual o valor de f(10)?",
        answers: [],
        correctAnswer: "5",
        explanation: "f(10) = 10 ÷ 2 = 5.",
      },
      {
        id: "func-2-q4",
        type: "tap-choice",
        question:
          "Quais valores pertencem à função f(x) = x² quando x = -2, -1, 0, 1, 2?",
        answers: [
          { id: "a1", text: "0", isCorrect: true },
          { id: "a2", text: "1", isCorrect: true },
          { id: "a3", text: "4", isCorrect: true },
          { id: "a4", text: "-2", isCorrect: false },
          { id: "a5", text: "-1", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation: "f(x) = x² sempre retorna valores ≥ 0.",
      },
    ],
  },
  "funcoes-3": {
    id: "funcoes-3",
    title: "Tipos de Funções",
    description: "Conheça funções lineares, quadráticas, constantes e afins.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "func-3-q1",
        type: "multiple-choice",
        question: "Qual é o tipo da função f(x) = 7?",
        answers: [
          { id: "a1", text: "Linear", isCorrect: false },
          { id: "a2", text: "Quadrática", isCorrect: false },
          { id: "a3", text: "Constante", isCorrect: true },
          { id: "a4", text: "Afim", isCorrect: false },
        ],
        correctAnswer: "a3",
        explanation: "Funções que não dependem de x são constantes.",
      },
      {
        id: "func-3-q2",
        type: "true-false",
        question: "A função f(x) = 2x é do tipo linear.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Funções do tipo f(x) = ax são lineares.",
      },
      {
        id: "func-3-q3",
        type: "complete-number",
        question: "Se f(x) = x² - 4, quanto vale f(3)?",
        answers: [],
        correctAnswer: "5",
        explanation: "f(3) = 3² - 4 = 9 - 4 = 5.",
      },
      {
        id: "func-3-q4",
        type: "tap-choice",
        question: "Marque todas as funções quadráticas:",
        answers: [
          { id: "a1", text: "f(x) = x²", isCorrect: true },
          { id: "a2", text: "f(x) = x + 1", isCorrect: false },
          { id: "a3", text: "f(x) = 3x² + 2x + 1", isCorrect: true },
          { id: "a4", text: "f(x) = 2", isCorrect: false },
        ],
        correctAnswer: ["a1", "a3"],
        explanation: "Funções quadráticas têm a forma ax² + bx + c.",
      },
    ],
  },
  "funcoes-4": {
    id: "funcoes-4",
    title: "Composição e Aplicações",
    description:
      "Resolva problemas reais com funções compostas e aplicações práticas.",
    xp: 45,
    difficulty: "avançado",
    questions: [
      {
        id: "func-4-q1",
        type: "multiple-choice",
        question: "Se f(x) = 2x e g(x) = x + 3, quanto vale f(g(1))?",
        answers: [
          { id: "a1", text: "8", isCorrect: true },
          { id: "a2", text: "10", isCorrect: false },
          { id: "a3", text: "6", isCorrect: false },
          { id: "a4", text: "4", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "g(1) = 4, f(4) = 8 → f(g(1)) = 8.",
      },
      {
        id: "func-4-q2",
        type: "true-false",
        question:
          "Funções compostas podem ser avaliadas aplicando uma função sobre o resultado da outra.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Composição: f(g(x)) → primeiro aplica g(x), depois f.",
      },
      {
        id: "func-4-q3",
        type: "complete-number",
        question: "Se f(x) = x² e g(x) = x - 1, quanto vale g(f(2))?",
        answers: [],
        correctAnswer: "3",
        explanation: "f(2) = 4, g(4) = 4 - 1 = 3.",
      },
      {
        id: "func-4-q4",
        type: "tap-choice",
        question: "Quais são aplicações reais de funções?",
        answers: [
          { id: "a1", text: "Conversão de temperaturas", isCorrect: true },
          { id: "a2", text: "Relógio analógico", isCorrect: true },
          { id: "a3", text: "Pintar uma parede", isCorrect: false },
          { id: "a4", text: "Cálculo de lucro", isCorrect: true },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation:
          "Funções modelam relações como temperatura, tempo, distância, lucro etc.",
      },
    ],
  },
  "estatistica-1": {
    id: "estatistica-1",
    title: "Medidas de Tendência Central",
    description: "Aprenda a calcular e interpretar média, mediana e moda.",
    xp: 15,
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
        type: "complete-number",
        question:
          "Em um conjunto de 7 números com média 15, a soma dos valores é igual a:",
        answers: [],
        correctAnswer: "105",
        explanation: "Soma = média × quantidade = 15 × 7 = 105",
      },
    ],
  },
  "estatistica-2": {
    id: "estatistica-2",
    title: "Medidas de Dispersão",
    description:
      "Entenda como a variância, desvio padrão e amplitude ajudam a analisar dados.",
    xp: 15,
    difficulty: "iniciante",
    questions: [
      {
        id: "est-2-q1",
        type: "multiple-choice",
        question: "Qual é a amplitude dos dados: 12, 7, 15, 10, 9?",
        answers: [
          { id: "a1", text: "8", isCorrect: true },
          { id: "a2", text: "7", isCorrect: false },
          { id: "a3", text: "6", isCorrect: false },
          { id: "a4", text: "5", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Amplitude = maior valor - menor valor = 15 - 7 = 8",
      },
      {
        id: "est-2-q2",
        type: "true-false",
        question: "O desvio padrão mede o quanto os dados se afastam da média.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "O desvio padrão mostra o grau de dispersão dos valores em relação à média.",
      },
      {
        id: "est-2-q3",
        type: "tap-choice",
        question: "Quais das opções abaixo são medidas de dispersão?",
        answers: [
          { id: "a1", text: "Amplitude", isCorrect: true },
          { id: "a2", text: "Moda", isCorrect: false },
          { id: "a3", text: "Desvio padrão", isCorrect: true },
          { id: "a4", text: "Variância", isCorrect: true },
          { id: "a5", text: "Mediana", isCorrect: false },
        ],
        correctAnswer: ["a1", "a3", "a4"],
        explanation:
          "Amplitude, desvio padrão e variância são medidas de dispersão. Moda e mediana são medidas de tendência central.",
      },
      {
        id: "est-2-q4",
        type: "sort",
        question:
          "Ordene os dados 6, 14, 10, 8, 12 para facilitar o cálculo da variância.",
        answers: [
          { id: "a1", text: "6", isCorrect: false },
          { id: "a2", text: "8", isCorrect: false },
          { id: "a3", text: "10", isCorrect: false },
          { id: "a4", text: "12", isCorrect: false },
          { id: "a5", text: "14", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3", "a4", "a5"],
        explanation:
          "Dados ordenados: 6, 8, 10, 12, 14. Facilita o cálculo da média e da variância.",
      },
      {
        id: "est-2-q5",
        type: "complete-number",
        question:
          "Se a média de um conjunto é 10 e o desvio padrão é 2, qual o valor que está dois desvios acima da média?",
        answers: [],
        correctAnswer: "14",
        explanation: "10 + (2 × 2) = 14",
      },
    ],
  },
  "estatistica-3": {
    id: "estatistica-3",
    title: "Representações Gráficas",
    description: "Interprete gráficos de barras, setores e histogramas.",
    xp: 30,
    difficulty: "intermediário",
    questions: [
      {
        id: "est-3-q1",
        type: "true-false",
        question:
          "Um gráfico de setores é ideal para representar porcentagens.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation:
          "Gráficos de setores (ou pizza) são usados para mostrar proporções em relação ao total.",
      },
      {
        id: "est-3-q2",
        type: "multiple-choice",
        question:
          "Qual tipo de gráfico é mais apropriado para mostrar a frequência de intervalos de dados numéricos?",
        answers: [
          { id: "a1", text: "Gráfico de barras", isCorrect: false },
          { id: "a2", text: "Histograma", isCorrect: true },
          { id: "a3", text: "Gráfico de setores", isCorrect: false },
          { id: "a4", text: "Gráfico de linhas", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation:
          "Histogramas agrupam dados em intervalos, ideais para variáveis contínuas.",
      },
      {
        id: "est-3-q3",
        type: "tap-choice",
        question:
          "Quais dos seguintes elementos são comuns em gráficos de barras?",
        answers: [
          { id: "a1", text: "Eixo Y (valores)", isCorrect: true },
          { id: "a2", text: "Setores circulares", isCorrect: false },
          {
            id: "a3",
            text: "Barras horizontais ou verticais",
            isCorrect: true,
          },
          { id: "a4", text: "Intervalos contínuos", isCorrect: false },
          { id: "a5", text: "Legenda", isCorrect: true },
        ],
        correctAnswer: ["a1", "a3", "a5"],
        explanation:
          "Gráficos de barras usam eixos, barras e legendas para representar dados categóricos.",
      },
      {
        id: "est-3-q4",
        type: "sort",
        question:
          "Ordene os tipos de gráfico abaixo do mais usado para dados categóricos ao mais usado para dados contínuos.",
        answers: [
          { id: "a1", text: "Gráfico de setores", isCorrect: false },
          { id: "a2", text: "Gráfico de barras", isCorrect: false },
          { id: "a3", text: "Histograma", isCorrect: false },
        ],
        correctAnswer: ["a2", "a1", "a3"],
        explanation:
          "Barras e setores para dados categóricos; histogramas para intervalos contínuos.",
      },
      {
        id: "est-3-q5",
        type: "complete-number",
        question:
          "Em um gráfico de setores, se uma categoria ocupa 90° do círculo, qual é sua porcentagem?",
        answers: [],
        correctAnswer: "25",
        explanation: "90° é ¼ de 360°, logo representa 25%.",
      },
    ],
  },
  "estatistica-4": {
    id: "estatistica-4",
    title: "Probabilidade Básica",
    description: "Entenda noções iniciais de probabilidade em eventos simples.",
    xp: 45,
    difficulty: "avançado",
    questions: [
      {
        id: "est-4-q1",
        type: "multiple-choice",
        question:
          "Qual é a probabilidade de sair um número par ao lançar um dado comum?",
        answers: [
          { id: "a1", text: "1/6", isCorrect: false },
          { id: "a2", text: "1/2", isCorrect: true },
          { id: "a3", text: "2/3", isCorrect: false },
          { id: "a4", text: "1/3", isCorrect: false },
        ],
        correctAnswer: "a2",
        explanation: "Números pares em um dado: 2, 4, 6 → 3 de 6 → 3/6 = 1/2",
      },
      {
        id: "est-4-q2",
        type: "true-false",
        question: "A probabilidade de um evento impossível é 0.",
        answers: [
          { id: "a1", text: "Verdadeiro", isCorrect: true },
          { id: "a2", text: "Falso", isCorrect: false },
        ],
        correctAnswer: "a1",
        explanation: "Eventos impossíveis têm probabilidade nula.",
      },
      {
        id: "est-4-q3",
        type: "tap-choice",
        question: "Quais destes são exemplos de eventos aleatórios?",
        answers: [
          { id: "a1", text: "Lançar uma moeda", isCorrect: true },
          {
            id: "a2",
            text: "Escolher uma carta de um baralho",
            isCorrect: true,
          },
          { id: "a3", text: "Calcular 2+2", isCorrect: false },
          { id: "a4", text: "Jogar um dado", isCorrect: true },
          { id: "a5", text: "Medir uma parede com régua", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a4"],
        explanation:
          "Eventos aleatórios envolvem incerteza no resultado, como lançar dados ou moedas.",
      },
      {
        id: "est-4-q4",
        type: "sort",
        question:
          "Ordene os eventos a seguir da menor para a maior probabilidade:",
        answers: [
          { id: "a1", text: "Sair o número 1 em um dado", isCorrect: false },
          {
            id: "a2",
            text: "Sair um número ímpar em um dado",
            isCorrect: false,
          },
          { id: "a3", text: "Sair qualquer número", isCorrect: false },
        ],
        correctAnswer: ["a1", "a2", "a3"],
        explanation:
          "Probabilidades: 1/6 (número 1), 3/6 (ímpares), 6/6 (qualquer número).",
      },
      {
        id: "est-4-q5",
        type: "complete-number",
        question:
          "Se há 10 bolas numeradas de 1 a 10 em uma urna, qual a probabilidade de sortear a bola 7?",
        answers: [],
        correctAnswer: "0.1",
        explanation: "1 chance em 10 = 1/10 = 0.1",
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
