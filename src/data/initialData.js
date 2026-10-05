import { offsetDate } from '../utils/dateUtils';

export const INITIAL_SUBJECTS = [
  {
    id: 'sub-1',
    name: 'Programming in C',
    code: 'CS101',
    teacher: 'Dr. Rajesh Sharma',
    color: '#dc2626', // Brand Crimson Red
    progress: 75
  },
  {
    id: 'sub-2',
    name: 'Web Technologies & Frontend',
    code: 'IT102',
    teacher: 'Prof. Anita Roy',
    color: '#e11d48', // Rose Red
    progress: 60
  },
  {
    id: 'sub-3',
    name: 'Discrete Mathematics',
    code: 'MA103',
    teacher: 'Dr. Vikram Joshi',
    color: '#ea580c', // Bright Amber-Red
    progress: 40
  },
  {
    id: 'sub-4',
    name: 'Computer Organization & Architecture',
    code: 'CS104',
    teacher: 'Prof. S. Sen',
    color: '#b91c1c', // Dark Crimson
    progress: 50
  },
  {
    id: 'sub-5',
    name: 'Database Management Systems',
    code: 'IT105',
    teacher: 'Dr. Meenakshi Iyer',
    color: '#991b1b', // Deep Ruby
    progress: 85
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Implement Doubly Linked List in C',
    subject: 'CS101',
    description: 'Write complete program with insertAtFront, deleteNode, and reverseTraversal functions.',
    dueDate: offsetDate(2),
    priority: 'High',
    status: 'pending'
  },
  {
    id: 'task-2',
    title: 'Design Responsive Navigation Bar using Flexbox',
    subject: 'IT102',
    description: 'Create mobile hamburger toggle and desktop dropdown menu with clean CSS transitions.',
    dueDate: offsetDate(1),
    priority: 'Medium',
    status: 'pending'
  },
  {
    id: 'task-3',
    title: 'Solve Propositional Logic & Truth Table Problem Set',
    subject: 'MA103',
    description: 'Exercise 2.3 problems 1 to 15 on Tautologies and De Morgan’s Laws.',
    dueDate: offsetDate(5),
    priority: 'High',
    status: 'pending'
  },
  {
    id: 'task-4',
    title: 'Write SQL Queries for Student Enrollment Database',
    subject: 'IT105',
    description: 'Write queries using INNER JOIN, LEFT JOIN, GROUP BY, and HAVING clauses.',
    dueDate: offsetDate(6),
    priority: 'Medium',
    status: 'pending'
  },
  {
    id: 'task-5',
    title: 'Truth Table for 4-Bit Ripple Carry Adder',
    subject: 'CS104',
    description: 'Draw logic diagram and derive Sum & Carry equations using Karnaugh Maps (K-Maps).',
    dueDate: offsetDate(8),
    priority: 'Low',
    status: 'pending'
  },
  {
    id: 'task-6',
    title: 'Lab 4: Pointers & Dynamic Memory Allocation (malloc)',
    subject: 'CS101',
    description: 'Implement dynamic array resizing with realloc and memory deallocation.',
    dueDate: offsetDate(-1), // Overdue for demonstration
    priority: 'High',
    status: 'pending'
  },
  {
    id: 'task-7',
    title: 'Normalize University Database Schema to 3NF',
    subject: 'IT105',
    description: 'Eliminate partial dependencies and transitive dependencies from sample tables.',
    dueDate: offsetDate(-3),
    priority: 'Medium',
    status: 'completed'
  },
  {
    id: 'task-8',
    title: 'Build Interactive Modal Component with Vanilla JavaScript',
    subject: 'IT102',
    description: 'Practice DOM event listeners (click, keydown Escape, backdrop click).',
    dueDate: offsetDate(-5),
    priority: 'Low',
    status: 'completed'
  }
];

export const INITIAL_EXAMS = [
  {
    id: 'exam-1',
    title: 'Midterm: C Programming & Data Structures',
    subject: 'CS101',
    date: offsetDate(4),
    type: 'Midterm',
    status: 'Upcoming'
  },
  {
    id: 'exam-2',
    title: 'Discrete Math Quiz 2: Relations & Graphs',
    subject: 'MA103',
    date: offsetDate(9),
    type: 'Quiz',
    status: 'Upcoming'
  },
  {
    id: 'exam-3',
    title: 'Web Technologies Lab Practical Exam',
    subject: 'IT102',
    date: offsetDate(15),
    type: 'Practical',
    status: 'Upcoming'
  },
  {
    id: 'exam-4',
    title: 'DBMS First Sessional Assessment',
    subject: 'IT105',
    date: offsetDate(22),
    type: 'Midterm',
    status: 'Upcoming'
  },
  {
    id: 'exam-5',
    title: 'Computer Fundamentals Quiz 1',
    subject: 'CS104',
    date: offsetDate(-10),
    type: 'Quiz',
    status: 'Completed'
  }
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'C Pointers & Memory Management Cheatsheet',
    subject: 'CS101',
    content: `## Pointers in C
- A pointer is a variable that stores the memory address of another variable.
- \`int *ptr = &x;\` -> \`ptr\` stores address of \`x\`.
- \`*ptr\` (dereferencing) accesses value at that address.

### Dynamic Memory Allocation:
1. \`malloc(size)\`: Allocates uninitialized memory.
2. \`calloc(n, size)\`: Allocates zero-initialized memory.
3. \`realloc(ptr, new_size)\`: Resizes allocated block.
4. \`free(ptr)\`: Always free dynamically allocated memory to prevent memory leaks!`,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'note-2',
    title: 'CSS Grid vs Flexbox: When to Use Which?',
    subject: 'IT102',
    content: `## Quick Comparison:
- **Flexbox**: 1-Dimensional layout (row OR column). Ideal for navigation bars, buttons, centering items.
- **CSS Grid**: 2-Dimensional layout (rows AND columns together). Perfect for dashboard layouts and card grids.

### Key CSS Grid Snippet:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\``,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'note-3',
    title: 'Set Theory Formulas & De Morgan’s Laws',
    subject: 'MA103',
    content: `## Discrete Mathematics Essentials
1. **De Morgan's Laws**:
   - \`¬(P ∧ Q) ≡ ¬P ∨ ¬Q\`
   - \`¬(P ∨ Q) ≡ ¬P ∧ ¬Q\`
2. **Conditional Identity**:
   - \`P → Q ≡ ¬P ∨ Q\`
3. **Contrapositive**:
   - \`P → Q ≡ ¬Q → ¬P\` (Equivalence used frequently in mathematical proofs).`,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'note-4',
    title: 'SQL Normalization: 1NF, 2NF, 3NF Explained',
    subject: 'IT105',
    content: `## Database Normalization
- **1NF (First Normal Form)**: Each table cell contains only atomic (indivisible) values; no repeating groups.
- **2NF (Second Normal Form)**: Must be in 1NF + all non-key attributes are fully functionally dependent on the entire primary key (no partial dependency).
- **3NF (Third Normal Form)**: Must be in 2NF + no transitive dependency (non-prime attributes must not depend on other non-prime attributes).`,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const INITIAL_SESSIONS = [
  {
    id: 'sess-1',
    subject: 'CS101',
    topic: 'Pointer Arithmetic & Dynamic Memory',
    duration: 60, // minutes
    date: offsetDate(-1)
  },
  {
    id: 'sess-2',
    subject: 'IT102',
    topic: 'Tailwind CSS Grid & Media Queries',
    duration: 45,
    date: offsetDate(-2)
  },
  {
    id: 'sess-3',
    subject: 'MA103',
    topic: 'Equivalence Relations & Partitions',
    duration: 50,
    date: offsetDate(-2)
  },
  {
    id: 'sess-4',
    subject: 'IT105',
    topic: 'SQL Joins and Grouping Functions',
    duration: 90,
    date: offsetDate(-3)
  },
  {
    id: 'sess-5',
    subject: 'CS104',
    topic: 'Instruction Cycle & Register Transfer',
    duration: 40,
    date: offsetDate(-4)
  },
  {
    id: 'sess-6',
    subject: 'CS101',
    topic: 'Recursion and Stack Frames',
    duration: 75,
    date: offsetDate(-5)
  }
];

export const INITIAL_PLANS = [
  {
    id: 'plan-1',
    subject: 'CS101',
    topic: 'Revise File Handling and Linked Lists for Midterm',
    availableTime: 120, // 2 hours
    examDate: offsetDate(4),
    priority: 'High',
    completed: false
  },
  {
    id: 'plan-2',
    subject: 'MA103',
    topic: 'Practice 15 Equivalence Relation Proofs',
    availableTime: 90,
    examDate: offsetDate(9),
    priority: 'High',
    completed: false
  },
  {
    id: 'plan-3',
    subject: 'IT102',
    topic: 'Complete Flexbox interactive nav lab exercise',
    availableTime: 60,
    examDate: offsetDate(15),
    priority: 'Medium',
    completed: true
  }
];

export const INITIAL_CHATS = [
  {
    id: 'chat-1',
    question: 'Can you explain how pointers work in C with a simple memory diagram analogy?',
    answer: `### Understanding Pointers in C 💡

Think of computer memory (RAM) as a **long row of mailboxes in an apartment building**:
1. Every mailbox has a unique **street number** (this is the **memory address**, e.g., \`0x7ffeef\`).
2. Inside each mailbox is a **letter** or parcel (this is the **value stored**, e.g., integer \`42\`).

---

### Code Example:
\`\`\`c
#include <stdio.h>

int main() {
    int score = 42;      // A regular variable
    int *ptr = &score;   // ptr holds the memory address of score

    printf("Value of score: %d\\n", score);     // Output: 42
    printf("Address of score: %p\\n", &score);  // e.g. 0x7ffd98a
    printf("Pointer value: %p\\n", ptr);       // Same address
    printf("Value via pointer (*ptr): %d\\n", *ptr); // Dereferenced: 42

    *ptr = 99; // Modifies the value directly in memory!
    printf("New score: %d\\n", score);          // Output: 99
    return 0;
}
\`\`\`

---

### Key Takeaways for B.Sc. IT First Year:
- \`&\` is the **Address-Of operator** (gives the memory address).
- \`*\` in declaration creates a pointer (\`int *p\`).
- \`*\` in expression is the **Dereference operator** (fetches or writes the value stored at that address).
- Always initialize pointers! Uninitialized pointers are **wild pointers** and can crash your application.`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'Explanation'
  }
];

export const INITIAL_SETTINGS = {
  studentName: 'Kenric & Partner',
  college: 'Department of Information Technology, B.Sc. IT',
  semester: 'First Year (Semester 1)',
  weeklyGoalHours: 15,
  darkMode: false,
  soundEffects: true
};
