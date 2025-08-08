const grades = [
  {
    _id: "g001",
    studentId: "234",
    studentName: "Bruce Wayne",
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    semester: "Fall 2020",
    assignments: [
      { name: "Assignment 1", score: 95, maxScore: 100, weight: 10 },
      { name: "Assignment 2", score: 88, maxScore: 100, weight: 10 },
      { name: "Assignment 3", score: 92, maxScore: 100, weight: 10 }
    ],
    quizzes: [
      { name: "Quiz 1", score: 18, maxScore: 20, weight: 5 },
      { name: "Quiz 2", score: 19, maxScore: 20, weight: 5 }
    ],
    midterm: { score: 85, maxScore: 100, weight: 25 },
    final: { score: 90, maxScore: 100, weight: 35 },
    participation: { score: 9, maxScore: 10, weight: 5 },
    letterGrade: "A-",
    finalScore: 89.2
  },
  {
    _id: "g002",
    studentId: "456",
    studentName: "Thor Odinson",
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    semester: "Fall 2020",
    assignments: [
      { name: "Assignment 1", score: 78, maxScore: 100, weight: 10 },
      { name: "Assignment 2", score: 82, maxScore: 100, weight: 10 },
      { name: "Assignment 3", score: 75, maxScore: 100, weight: 10 }
    ],
    quizzes: [
      { name: "Quiz 1", score: 15, maxScore: 20, weight: 5 },
      { name: "Quiz 2", score: 16, maxScore: 20, weight: 5 }
    ],
    midterm: { score: 72, maxScore: 100, weight: 25 },
    final: { score: 78, maxScore: 100, weight: 35 },
    participation: { score: 8, maxScore: 10, weight: 5 },
    letterGrade: "C+",
    finalScore: 77.1
  },
  {
    _id: "g003",
    studentId: "567",
    studentName: "Bruce Banner",
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    semester: "Fall 2020",
    assignments: [
      { name: "Assignment 1", score: 100, maxScore: 100, weight: 10 },
      { name: "Assignment 2", score: 98, maxScore: 100, weight: 10 },
      { name: "Assignment 3", score: 100, maxScore: 100, weight: 10 }
    ],
    quizzes: [
      { name: "Quiz 1", score: 20, maxScore: 20, weight: 5 },
      { name: "Quiz 2", score: 20, maxScore: 20, weight: 5 }
    ],
    midterm: { score: 98, maxScore: 100, weight: 25 },
    final: { score: 97, maxScore: 100, weight: 35 },
    participation: { score: 10, maxScore: 10, weight: 5 },
    letterGrade: "A+",
    finalScore: 98.3
  },
  {
    _id: "g004",
    studentId: "890",
    studentName: "Legolas Greenleaf",
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    semester: "Fall 2020",
    assignments: [
      { name: "Assignment 1", score: 92, maxScore: 100, weight: 10 },
      { name: "Assignment 2", score: 90, maxScore: 100, weight: 10 },
      { name: "Assignment 3", score: 94, maxScore: 100, weight: 10 }
    ],
    quizzes: [
      { name: "Quiz 1", score: 19, maxScore: 20, weight: 5 },
      { name: "Quiz 2", score: 18, maxScore: 20, weight: 5 }
    ],
    midterm: { score: 91, maxScore: 100, weight: 25 },
    final: { score: 93, maxScore: 100, weight: 35 },
    participation: { score: 10, maxScore: 10, weight: 5 },
    letterGrade: "A",
    finalScore: 92.1
  },
  {
    _id: "g005",
    studentId: "234",
    studentName: "Bruce Wayne",
    courseId: "MATH201",
    courseName: "Calculus II",
    semester: "Fall 2020",
    assignments: [
      { name: "Homework 1", score: 45, maxScore: 50, weight: 15 },
      { name: "Homework 2", score: 48, maxScore: 50, weight: 15 }
    ],
    quizzes: [
      { name: "Quiz 1", score: 8, maxScore: 10, weight: 10 },
      { name: "Quiz 2", score: 9, maxScore: 10, weight: 10 }
    ],
    midterm: { score: 88, maxScore: 100, weight: 25 },
    final: { score: 92, maxScore: 100, weight: 25 },
    participation: { score: 0, maxScore: 0, weight: 0 },
    letterGrade: "A-",
    finalScore: 89.5
  },
  {
    _id: "g006",
    studentId: "567",
    studentName: "Bruce Banner",
    courseId: "PHYS301",
    courseName: "Quantum Physics",
    semester: "Fall 2020",
    assignments: [
      { name: "Lab Report 1", score: 95, maxScore: 100, weight: 20 },
      { name: "Lab Report 2", score: 98, maxScore: 100, weight: 20 }
    ],
    quizzes: [],
    midterm: { score: 100, maxScore: 100, weight: 30 },
    final: { score: 99, maxScore: 100, weight: 30 },
    participation: { score: 0, maxScore: 0, weight: 0 },
    letterGrade: "A+",
    finalScore: 98.0
  }
];

export default grades;