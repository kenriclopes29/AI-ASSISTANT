/**
 * Mock AI Study Engine for College Students (B.Sc. IT Academic Focus)
 * Transparently simulated academic knowledge engine.
 * No API keys or external servers required.
 */

export const QUICK_PROMPTS = [
  {
    label: 'Explain C Pointers',
    category: 'Explanation',
    prompt: 'Explain C pointers and dynamic memory allocation (malloc, free) with a simple diagram analogy and code.'
  },
  {
    label: 'CSS Flexbox vs Grid',
    category: 'Explanation',
    prompt: 'What is the exact difference between CSS Flexbox and CSS Grid? When should I use each in frontend development?'
  },
  {
    label: 'Practice Questions: SQL',
    category: 'Practice Questions',
    prompt: 'Generate 5 practice multiple-choice and viva questions on SQL Joins and Normalization with answers.'
  },
  {
    label: 'Discrete Math Summary',
    category: 'Summary',
    prompt: 'Provide a concise revision summary of Propositional Logic, Truth Tables, and De Morgan’s Laws.'
  },
  {
    label: '3-Day Exam Revision Plan',
    category: 'Study Plan',
    prompt: 'Create a focused 3-day study and revision schedule for my upcoming C Programming Midterm exam.'
  },
  {
    label: 'TCP vs UDP Comparison',
    category: 'Explanation',
    prompt: 'Compare TCP and UDP protocols with real-world examples, packet structure, and pros/cons.'
  }
];

export const generateMockAIResponse = (userQuestion) => {
  const q = userQuestion.toLowerCase().trim();

  // 1. POINTERS & MEMORY (C Language)
  if (q.includes('pointer') || q.includes('malloc') || q.includes('dynamic memory') || q.includes('memory allocation')) {
    return `### 💡 Deep Dive: Pointers & Dynamic Memory in C

**Core Concept:**
A pointer is simply an integer variable that holds the **hexadecimal address** of another variable in RAM.

#### 1. Pointer Syntax Cheat Sheet:
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int val = 25;
    int *p = &val; // p points to val

    printf("Address: %p | Value: %d\\n", (void*)p, *p);

    // Dynamic Allocation on the Heap:
    int *arr = (int*) malloc(5 * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < 5; i++) arr[i] = (i + 1) * 10;
    
    // Always free heap memory!
    free(arr);
    arr = NULL; // Prevent dangling pointer
    return 0;
}
\`\`\`

#### 2. The 4 Dynamic Memory Functions:
- \`malloc(size_t size)\`: Allocates raw, uninitialized memory block.
- \`calloc(num, size)\`: Allocates memory and clears all bytes to zero (\`0\`).
- \`realloc(ptr, new_size)\`: Expands or shrinks an existing allocated block.
- \`free(ptr)\`: Returns memory back to the Operating System heap.

#### 🎓 First-Year Exam & Viva Tip:
In viva exams, professors frequently ask: *"What is a memory leak?"*
**Answer:** A memory leak occurs when heap memory allocated via \`malloc\` is not freed with \`free()\`, wasting system RAM until the process terminates.`;
  }

  // 2. CSS FLEXBOX VS GRID
  if (q.includes('flexbox') || q.includes('css grid') || q.includes('css layout') || q.includes('frontend layout')) {
    return `### 🎨 CSS Flexbox vs. CSS Grid: The Complete Guide

College web development projects often struggle with deciding between Flexbox and Grid. Here is the definitive rule:

| Feature | CSS Flexbox | CSS Grid |
| :--- | :--- | :--- |
| **Dimension** | 1-Dimensional (Row OR Column) | 2-Dimensional (Rows AND Columns) |
| **Philosophy** | Content-first (items push space) | Layout-first (rigid grid matrix) |
| **Best For** | Navbars, button groups, modal center | Page layouts, photo galleries, dashboards |
| **Key Property** | \`display: flex; flex-direction: row;\` | \`display: grid; grid-template-columns: ...\` |

#### Quick Code Example:
\`\`\`css
/* 1. Flexbox Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

/* 2. Responsive Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
\`\`\`

#### 💡 Practical Rule of Thumb:
Use **Grid** for the outer macro-layout of your website (e.g. sidebar + main header + cards grid), and use **Flexbox** for the micro-components inside each card (e.g. icon + title + badges).`;
  }

  // 3. NORMALIZATION & SQL
  if (q.includes('normaliz') || q.includes('sql') || q.includes('database') || q.includes('dbms') || q.includes('join')) {
    return `### 🗄️ Database Normalization & SQL Essentials

**Why Normalization?**
Normalization organizes table columns to eliminate **redundancy** and prevent **Insert, Update, and Delete Anomalies**.

#### The Three Main Normal Forms:
1. **1NF (First Normal Form)**:
   - Every column must contain **atomic (indivisible) values**.
   - No repeating multi-value groups (e.g., storing \`PhoneNumbers: "9876, 5432"\` in one cell violates 1NF).
2. **2NF (Second Normal Form)**:
   - Must be in 1NF.
   - **No Partial Dependency**: Every non-key column must depend on the *entire* primary key (only applies when PK is composite).
3. **3NF (Third Normal Form)**:
   - Must be in 2NF.
   - **No Transitive Dependency**: If $X \\rightarrow Y$ and $Y \\rightarrow Z$, then $Z$ must not depend on non-key attribute $Y$.

#### SQL Joins Visual Breakdown:
\`\`\`sql
-- INNER JOIN: Only records matching in both tables
SELECT s.name, c.course_title 
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON e.course_id = c.id;

-- LEFT JOIN: All students, even if they have zero enrollments
SELECT s.name, e.grade
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id;
\`\`\`

#### 🎓 First-Year Exam Question:
*Question:* "Can a table in 2NF have transitive dependencies?"
*Answer:* **Yes!** That is precisely why 3NF exists to eliminate them.`;
  }

  // 4. DISCRETE MATH & PROPOSITIONAL LOGIC
  if (q.includes('discrete') || q.includes('logic') || q.includes('truth table') || q.includes('de morgan') || q.includes('tautology')) {
    return `### 📐 Discrete Mathematics: Propositional Logic Cheat Sheet

#### 1. Core Logical Connectives:
- **Negation (NOT)**: $\\neg P$ (Flips truth value)
- **Conjunction (AND)**: $P \\land Q$ (True only if BOTH are true)
- **Disjunction (OR)**: $P \\lor Q$ (True if AT LEAST ONE is true)
- **Implication (IF...THEN)**: $P \\rightarrow Q$ (False ONLY when $P$ is True and $Q$ is False!)
- **Biconditional (IFF)**: $P \\leftrightarrow Q$ (True when both match: T-T or F-F)

#### 2. Truth Table for Implication ($P \\rightarrow Q$):
| $P$ | $Q$ | $P \\land Q$ | $P \\lor Q$ | $P \\rightarrow Q$ | $\\neg P \\lor Q$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| T | T | T | T | **T** | **T** |
| T | F | F | T | **F** | **F** |
| F | T | F | T | **T** | **T** |
| F | F | F | F | **T** | **T** |

*Note: Notice how $P \\rightarrow Q$ is logically equivalent to $\\neg P \\lor Q$.*

#### 3. De Morgan's Laws:
- $\\neg (P \\land Q) \\equiv \\neg P \\lor \\neg Q$
- $\\neg (P \\lor Q) \\equiv \\neg P \\land \\neg Q$

#### 4. Definitions:
- **Tautology**: A proposition that is always True in every row of its truth table (e.g., $P \\lor \\neg P$).
- **Contradiction**: A proposition that is always False (e.g., $P \\land \\neg P$).
- **Contingency**: Can be either True or False depending on assignments.`;
  }

  // 5. PRACTICE QUESTIONS & QUIZZES
  if (q.includes('practice') || q.includes('quiz') || q.includes('question') || q.includes('mcq') || q.includes('revision test')) {
    return `### 📝 First-Year B.Sc. IT Practice & Viva Questions

Here are 5 curated questions designed for first-year internal exams:

#### Q1 (C Programming):
**What will be the output of \`int a=5; printf("%d %d", ++a, a++);\`?**
- **A)** 6 5
- **B)** 7 5
- **C)** Undefined Behavior (sequence point violation)
- **D)** 6 6
> **Correct Answer: C** *(Modifying a variable twice in the same expression without an intervening sequence point invokes undefined behavior in C standard ISO 9899).*

---

#### Q2 (Computer Architecture):
**Which register holds the memory address of the next instruction to be fetched?**
- **A)** Accumulator (AC)
- **B)** Program Counter (PC)
- **C)** Memory Buffer Register (MBR)
- **D)** Instruction Register (IR)
> **Correct Answer: B (Program Counter)**

---

#### Q3 (Database Systems):
**Which SQL constraint guarantees that no two rows can have the same value in a column, while still allowing NULL values?**
- **A)** PRIMARY KEY
- **B)** FOREIGN KEY
- **C)** UNIQUE
- **D)** CHECK
> **Correct Answer: C (UNIQUE)**

---

#### Q4 (Web Technologies):
**Which HTML5 element represents self-contained, independently distributable content?**
- **A)** \`<section>\`
- **B)** \`<article>\`
- **C)** \`<div>\`
- **D)** \`<aside>\`
> **Correct Answer: B (\`<article>\`)**

---

#### Q5 (Discrete Mathematics - Viva Special):
**What is the cardinality of the Power Set $P(S)$ of a set $S$ with $n$ elements?**
> **Answer:** $2^n$. For instance, if $S = \\{a, b\\}$, $|P(S)| = 2^2 = 4$.`;
  }

  // 6. STUDY PLAN / REVISION SCHEDULE
  if (q.includes('plan') || q.includes('schedule') || q.includes('timetable') || q.includes('exam prep') || q.includes('revision')) {
    return `### 📅 High-Yield 3-Day College Exam Revision Plan

Here is a structured, science-backed study schedule tailored for college students using the **Pomodoro + Active Recall** technique:

#### Day 1: Foundation & Core Theory (4 Hours Total)
- **Morning (9:00 AM - 11:00 AM):**
  - Read lecture slides and syllabus units 1 & 2.
  - Write active recall notes (closed book: write everything you remember, then check).
- **Afternoon (3:00 PM - 5:00 PM):**
  - Solve fundamental definitions, circuit diagrams, and syntax proofs.
  - Highlight formula sheets and syntax cheat-sheets.

#### Day 2: Problem Solving & Code Execution (4.5 Hours Total)
- **Morning (9:00 AM - 11:30 AM):**
  - Practice handwritten code on paper (essential for college paper tests).
  - Trace pointers, recursion call stacks, and loops step-by-step.
- **Evening (4:00 PM - 6:00 PM):**
  - Solve past 3 years university question papers. Mark questions that repeat.

#### Day 3: Mock Test & Final Rapid Polish (3.5 Hours Total)
- **Morning (10:00 AM - 12:00 PM):**
  - Timed 2-hour mock exam using a previous year midterm question paper.
- **Evening (6:00 PM - 7:30 PM):**
  - Review mistake log.
  - Relax, hydrate, and get at least 7.5 hours of sleep!

#### 💡 Golden Rule for Tomorrow:
Do **NOT** start learning a brand new, unread unit 4 hours before the exam. Double down on topics you already understand to guarantee 100% marks in those sections!`;
  }

  // 7. NETWORKING (TCP vs UDP)
  if (q.includes('tcp') || q.includes('udp') || q.includes('network') || q.includes('osi') || q.includes('protocol')) {
    return `### 🌐 TCP vs UDP: Networking Fundamentals

#### Quick Comparison:
| Parameter | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection Type** | Connection-Oriented (3-Way Handshake) | Connectionless (Fire & Forget) |
| **Reliability** | Guaranteed delivery (Retransmission) | Unreliable (No acknowledgments) |
| **Speed** | Slower due to overhead & flow control | Extremely Fast with minimal latency |
| **Header Size** | 20 to 60 bytes | Fixed 8 bytes |
| **Use Cases** | Web (HTTP/HTTPS), Email (SMTP), Files (FTP) | Video streaming, VoIP, Online multiplayer gaming |

#### The 3-Way Handshake (TCP):
1. **Client $\\rightarrow$ Server**: \`SYN\` (Synchronize sequence numbers)
2. **Server $\\rightarrow$ Client**: \`SYN-ACK\` (Acknowledge and synchronize)
3. **Client $\\rightarrow$ Server**: \`ACK\` (Acknowledge, connection established!)

#### 🎓 College Viva Tip:
Why does DNS use UDP for standard queries?
*Because DNS queries are small (single request packet), and UDP avoids the round-trip latency of TCP handshakes.*`;
  }

  // 8. DATA STRUCTURES (Stacks, Queues, Linked Lists, Trees)
  if (q.includes('stack') || q.includes('queue') || q.includes('tree') || q.includes('linked list') || q.includes('data structure') || q.includes('big o') || q.includes('sorting')) {
    return `### 🌳 Data Structures & Complexity Overview

#### 1. Linear vs Non-Linear:
- **Stacks (LIFO - Last In First Out)**: Used in function recursion call stacks, undo/redo mechanisms, and parentheses matching.
- **Queues (FIFO - First In First Out)**: Used in CPU job scheduling, printer queues, and Breadth-First Search (BFS).
- **Linked Lists**: Dynamic size, $O(1)$ insertion at head, but sequential $O(n)$ access.

#### 2. Big-O Complexity Comparison:
| Operation | Array | Singly Linked List | Binary Search Tree (Balanced) |
| :--- | :---: | :---: | :---: |
| **Access by Index** | $O(1)$ | $O(n)$ | $N/A$ |
| **Search by Value** | $O(n)$ | $O(n)$ | $O(\\log n)$ |
| **Insert at Beginning**| $O(n)$ | $O(1)$ | $O(\\log n)$ |
| **Insert at End** | $O(1)$ amortized | $O(n)$ or $O(1)$ | $O(\\log n)$ |

#### 3. Binary Search Tree (BST) Invariant:
For every node $N$:
- All values in the **Left Subtree** are $< N.val$.
- All values in the **Right Subtree** are $> N.val$.
- **In-order Traversal** (Left $\\rightarrow$ Root $\\rightarrow$ Right) of a BST always yields numbers in **ascending sorted order**!`;
  }

  // 9. GENERAL ACADEMIC SYNTHESIZER FALLBACK
  const cleanTerm = userQuestion.replace(/[^\w\s]/gi, '').trim();
  return `### 🎓 Academic Study Guide: "${cleanTerm.length > 50 ? cleanTerm.substring(0, 50) + '...' : cleanTerm}"

**Category:** Academic Concept & Practical Study Synthesis

---

#### 1. Concept Definition & Purpose
Understanding **${cleanTerm}** is a core milestone in your college curriculum. At a high level:
- It solves foundational efficiency and organizational challenges in software architecture and computational logic.
- It forms the theoretical basis for semester examinations, viva presentations, and practical laboratory tests.

---

#### 2. Core Principles & Breakdown:
1. **Underlying Structure**: Always decompose the topic into inputs, processing logic, and verifiable outputs.
2. **Key Trade-offs**: Contrast space complexity, execution time, implementation simplicity, and maintenance overhead.
3. **Application Scenario**: Identify where modern engineering teams employ this exact concept in production.

---

#### 3. Structured Study & Exam Action Plan:
- **Step 1**: Write down the formal mathematical or programmatic definition without looking at notes.
- **Step 2**: Diagram the flow with boxes and arrows to build intuitive mental models.
- **Step 3**: Implement a minimal working prototype or solve 3 textbook end-of-chapter problems.

---

#### 💡 Study Assistant Tip:
Need more specific help? You can ask me:
- *"Give me a step-by-step code example of this."*
- *"Generate 3 viva practice questions on this topic."*
- *"Summarize this in 3 bullet points for revision."*`;
};
