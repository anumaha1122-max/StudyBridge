export const dummyUsers = [
  {
    id: 1,
    name: "Rahul Student",
    email: "student@studybridge.com",
    password: "student123",
    role: "STUDENT",
    className: "10th A",
    rollNumber: "STU101",
  },
  {
    id: 2,
    name: "Anitha Teacher",
    email: "teacher@studybridge.com",
    password: "teacher123",
    role: "TEACHER",
    subject: "Mathematics",
  },
  {
    id: 3,
    name: "Suresh Parent",
    email: "parent@studybridge.com",
    password: "parent123",
    role: "PARENT",
    childName: "Rahul Student",
  },
  {
    id: 4,
    name: "School Admin",
    email: "admin@studybridge.com",
    password: "admin123",
    role: "ADMIN",
  },
];

export const initialData = {
  students: [
    { id: 1, name: "Rahul Student", className: "10th A", rollNumber: "STU101", performance: 82, attendance: 94 },
    { id: 2, name: "Priya Sharma", className: "10th A", rollNumber: "STU102", performance: 88, attendance: 96 },
    { id: 3, name: "Akhil Kumar", className: "9th B", rollNumber: "STU201", performance: 74, attendance: 89 },
  ],

  teachers: [
    { id: 1, name: "Anitha Teacher", subject: "Mathematics", className: "10th A" },
    { id: 2, name: "Ravi Sir", subject: "Science", className: "9th B" },
  ],

  parents: [
    { id: 1, name: "Suresh Parent", childName: "Rahul Student" },
    { id: 2, name: "Lakshmi Parent", childName: "Priya Sharma" },
  ],

  classes: [
    { id: 1, className: "10th", section: "A", students: 32 },
    { id: 2, className: "9th", section: "B", students: 28 },
    { id: 3, className: "8th", section: "A", students: 30 },
  ],

  subjects: [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "English" },
    { id: 4, name: "Social" },
    { id: 5, name: "Telugu" },
  ],

  homework: [
    { id: 1, title: "Math Exercise 4.2", subject: "Mathematics", teacher: "Anitha Teacher", dueDate: "2026-06-15", status: "PENDING" },
    { id: 2, title: "Science Lab Notes", subject: "Science", teacher: "Ravi Sir", dueDate: "2026-06-16", status: "SUBMITTED" },
    { id: 3, title: "English Essay", subject: "English", teacher: "Mary Madam", dueDate: "2026-06-18", status: "REVIEWED" },
  ],

  homeworkSubmissions: [
    { id: 1, student: "Rahul Student", homework: "Science Lab Notes", status: "SUBMITTED", remark: "" },
  ],

  exams: [
    { id: 1, title: "Math Unit Test", subject: "Mathematics", date: "2026-06-20", syllabus: "Algebra, Geometry", status: "UPCOMING" },
    { id: 2, title: "Science Test", subject: "Science", date: "2026-06-24", syllabus: "Light, Sound", status: "UPCOMING" },
  ],

  marks: [
    { id: 1, subject: "Mathematics", marks: 86, total: 100, grade: "A" },
    { id: 2, subject: "Science", marks: 78, total: 100, grade: "B" },
  ],

  attendance: [
    { id: 1, date: "2026-06-10", status: "PRESENT" },
    { id: 2, date: "2026-06-09", status: "PRESENT" },
    { id: 3, date: "2026-06-08", status: "ABSENT" },
  ],

  tasks: [
    { id: 1, title: "Revise Algebra", priority: "HIGH", status: "PENDING" },
    { id: 2, title: "Read Science Chapter 2", priority: "MEDIUM", status: "COMPLETED" },
  ],

  studyPlans: [
    { id: 1, subject: "Mathematics", chapter: "Algebra", progress: 70, status: "IN_PROGRESS" },
  ],

  weakTopics: [
    { id: 1, subject: "Mathematics", topic: "Quadratic Equations", reason: "Low test score", status: "IMPROVING" },
  ],

  notes: [
    { id: 1, title: "Algebra Notes", subject: "Mathematics", type: "PDF", read: false },
    { id: 2, title: "Light Chapter", subject: "Science", type: "Video", read: true },
  ],

  events: [
    { id: 1, title: "Parent Teacher Meeting", date: "2026-06-25", status: "EVENT" },
    { id: 2, title: "Science Exhibition", date: "2026-07-02", status: "EVENT" },
  ],

  announcements: [
    { id: 1, title: "Holiday Notice", message: "School closed on Friday." },
  ],

  feedback: [
    { id: 1, teacher: "Anitha Teacher", type: "Academic", message: "Good progress in Mathematics." },
    { id: 2, teacher: "Ravi Sir", type: "Behavior", message: "Very active in class." },
  ],

  messages: [
    { id: 1, from: "Parent", to: "Teacher", message: "Can we schedule a meeting?", time: "10:30 AM" },
    { id: 2, from: "Teacher", to: "Parent", message: "Yes, tomorrow evening is fine.", time: "10:35 AM" },
  ],

  notifications: [
    { id: 1, title: "Homework Assigned", message: "New Mathematics homework assigned.", read: false },
    { id: 2, title: "Marks Uploaded", message: "Science marks are available.", read: false },
  ],

  meetingRequests: [
    { id: 1, parent: "Suresh Parent", teacher: "Anitha Teacher", reason: "Discuss math performance", status: "REQUESTED" },
  ],

  timetable: [
    { id: 1, day: "Monday", period: 1, subject: "Mathematics", teacher: "Anitha Teacher", time: "09:00 - 09:45" },
    { id: 2, day: "Monday", period: 2, subject: "Science", teacher: "Ravi Sir", time: "09:45 - 10:30" },
  ],

  diary: [
    { id: 1, date: "2026-06-10", summary: "Completed Algebra basics.", homework: "Exercise 4.2", acknowledged: false },
  ],

  leaveRequests: [
    { id: 1, reason: "Fever", fromDate: "2026-06-11", toDate: "2026-06-12", status: "REQUESTED" },
  ],

  behavior: [
    { id: 1, type: "POSITIVE", points: 5, remark: "Helped classmates." },
    { id: 2, type: "DISCIPLINE", points: -2, remark: "Late to class." },
  ],

  achievements: [
    { id: 1, title: "Homework Champion", description: "Completed all homework this week." },
    { id: 2, title: "Perfect Attendance", description: "No absence this month." },
  ],

  fees: [
    { id: 1, title: "Term Fee", amount: 12000, dueDate: "2026-06-30", status: "PENDING" },
  ],

  digitalIds: [
    { id: 1, name: "Rahul Student", className: "10th A", rollNumber: "STU101", bloodGroup: "O+", emergency: "9876543210" },
  ],

  doubts: [
    { id: 1, subject: "Mathematics", doubt: "How to solve quadratic equations?", answer: "", status: "PENDING" },
  ],
};
