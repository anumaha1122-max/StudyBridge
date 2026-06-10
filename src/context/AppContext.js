import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const STORAGE_KEY = "STUDYBRIDGE_APP_DATA_V1";

const now = () => new Date().toISOString();

const initialState = {
  students: [
    {
      id: 1,
      name: "Rahul Student",
      classId: 1,
      className: "10th A",
      rollNumber: "STU101",
      parentId: 1,
      attendancePercentage: 94,
      performancePercentage: 82,
      behaviorScore: 80,
      bloodGroup: "O+",
      emergencyContact: "9876543210",
    },
    {
      id: 2,
      name: "Priya Sharma",
      classId: 1,
      className: "10th A",
      rollNumber: "STU102",
      parentId: 2,
      attendancePercentage: 96,
      performancePercentage: 88,
      behaviorScore: 90,
      bloodGroup: "B+",
      emergencyContact: "9876543211",
    },
  ],

  teachers: [
    {
      id: 1,
      name: "Anitha Teacher",
      subject: "Mathematics",
      classId: 1,
      className: "10th A",
    },
    {
      id: 2,
      name: "Ravi Sir",
      subject: "Science",
      classId: 1,
      className: "10th A",
    },
  ],

  parents: [
    {
      id: 1,
      name: "Suresh Parent",
      childId: 1,
      childName: "Rahul Student",
    },
    {
      id: 2,
      name: "Lakshmi Parent",
      childId: 2,
      childName: "Priya Sharma",
    },
  ],

  classes: [
    {
      id: 1,
      name: "10th A",
      className: "10th",
      section: "A",
      academicYear: "2026-2027",
      studentsCount: 32,
    },
    {
      id: 2,
      name: "9th B",
      className: "9th",
      section: "B",
      academicYear: "2026-2027",
      studentsCount: 28,
    },
  ],

  subjects: [
    { id: 1, name: "Mathematics", classId: 1 },
    { id: 2, name: "Science", classId: 1 },
    { id: 3, name: "English", classId: 1 },
  ],

  homework: [
    {
      id: 1,
      title: "Math Exercise 4.2",
      description: "Solve all problems from Exercise 4.2.",
      classId: 1,
      className: "10th A",
      subject: "Mathematics",
      teacherId: 1,
      teacherName: "Anitha Teacher",
      dueDate: "2026-06-18",
      instructions: "Submit clear photos of your notebook.",
      createdAt: now(),
    },
  ],

  homeworkSubmissions: [],

  exams: [
    {
      id: 1,
      title: "Math Unit Test",
      classId: 1,
      className: "10th A",
      subject: "Mathematics",
      examDate: "2026-06-22",
      startTime: "10:00 AM",
      syllabus: "Algebra and Geometry",
      instructions: "Bring geometry box.",
      teacherId: 1,
      createdAt: now(),
    },
  ],

  marks: [],

  attendance: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Student",
      classId: 1,
      subject: "Mathematics",
      date: "2026-06-10",
      status: "PRESENT",
      remark: "",
      createdAt: now(),
    },
  ],

  tasks: [
    {
      id: 1,
      studentId: 1,
      title: "Revise Algebra",
      subject: "Mathematics",
      priority: "HIGH",
      dueDate: "2026-06-15",
      status: "PENDING",
      createdAt: now(),
    },
  ],

  studyPlans: [
    {
      id: 1,
      studentId: 1,
      subject: "Mathematics",
      chapterName: "Algebra",
      targetDate: "2026-06-20",
      progressPercentage: 70,
      status: "IN_PROGRESS",
      createdAt: now(),
    },
  ],

  weakTopics: [
    {
      id: 1,
      studentId: 1,
      subject: "Mathematics",
      topicName: "Quadratic Equations",
      reason: "Needs more practice",
      improvementStatus: "IMPROVING",
      teacherRemark: "Practice 10 sums daily",
      createdAt: now(),
    },
  ],

  notes: [
    {
      id: 1,
      title: "Algebra Notes",
      subject: "Mathematics",
      classId: 1,
      teacherId: 1,
      type: "PDF",
      readBy: [],
      createdAt: now(),
    },
  ],

  doubts: [],

  meetings: [],

  fees: [
    {
      id: 1,
      title: "Term 1 Fee",
      classId: 1,
      amount: 12000,
      dueDate: "2026-06-30",
      status: "PENDING",
      paymentProof: "",
      studentId: 1,
      parentId: 1,
      createdAt: now(),
    },
  ],

  diary: [],

  leaveRequests: [],

  behavior: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Student",
      type: "POSITIVE",
      points: 5,
      remark: "Helped classmates.",
      createdAt: now(),
    },
  ],

  achievements: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Student",
      title: "Homework Champion",
      description: "Completed all homework this week.",
      awardedBy: "Anitha Teacher",
      createdAt: now(),
    },
  ],

  timetable: [
    {
      id: 1,
      classId: 1,
      day: "Monday",
      period: 1,
      subject: "Mathematics",
      teacher: "Anitha Teacher",
      room: "101",
      time: "09:00 - 09:45",
    },
    {
      id: 2,
      classId: 1,
      day: "Monday",
      period: 2,
      subject: "Science",
      teacher: "Ravi Sir",
      room: "102",
      time: "09:45 - 10:30",
    },
  ],

  events: [
    {
      id: 1,
      title: "Parent Teacher Meeting",
      description: "Monthly parent-teacher meeting",
      eventDate: "2026-06-25",
      targetRole: "ALL",
      classId: 1,
      createdAt: now(),
    },
  ],

  announcements: [
    {
      id: 1,
      title: "Holiday Notice",
      message: "School will be closed on Friday.",
      targetRole: "ALL",
      classId: 1,
      createdAt: now(),
    },
  ],

  feedback: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Student",
      teacherId: 1,
      teacherName: "Anitha Teacher",
      subject: "Mathematics",
      type: "ACADEMIC",
      message: "Good progress in Mathematics.",
      createdAt: now(),
    },
  ],

  messages: [
    {
      id: 1,
      senderRole: "PARENT",
      receiverRole: "TEACHER",
      senderName: "Suresh Parent",
      receiverName: "Anitha Teacher",
      message: "Can we discuss Rahul's math progress?",
      read: false,
      createdAt: now(),
    },
  ],

  notifications: [
    {
      id: 1,
      userRole: "STUDENT",
      userId: 1,
      title: "Welcome",
      message: "Your StudyBridge account is ready.",
      read: false,
      createdAt: now(),
    },
    {
      id: 2,
      userRole: "PARENT",
      userId: 1,
      title: "Fee Due",
      message: "Term 1 fee is pending.",
      read: false,
      createdAt: now(),
    },
  ],

  digitalIds: [
    {
      id: 1,
      userRole: "STUDENT",
      userId: 1,
      studentId: 1,
      name: "Rahul Student",
      className: "10th A",
      rollNumber: "STU101",
      bloodGroup: "O+",
      emergencyContact: "9876543210",
      cardNumber: "SB-STU-101",
      qrValue: "STUDYBRIDGE-STUDENT-1",
      createdAt: now(),
    },
  ],
};

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!appLoading) {
      saveData(state);
    }
  }, [state, appLoading]);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        setState(JSON.parse(stored));
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      }
    } catch (error) {
      console.log("App data load error:", error);
    } finally {
      setAppLoading(false);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log("App data save error:", error);
    }
  };

  const resetAppData = async () => {
    setState(initialState);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  };

  const setAndSave = (updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next;
    });
  };

  const getStudent = (studentId = 1) =>
    state.students.find((student) => student.id === Number(studentId));

  const getTeacher = (teacherId = 1) =>
    state.teachers.find((teacher) => teacher.id === Number(teacherId));

  const getParentByStudent = (studentId = 1) => {
    const student = getStudent(studentId);
    return state.parents.find((parent) => parent.id === student?.parentId);
  };

  const createNotificationObject = ({ userRole, userId, title, message, type = "GENERAL" }) => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    userRole,
    userId,
    title,
    message,
    type,
    read: false,
    createdAt: now(),
  });

  const addNotification = ({ userRole, userId, title, message, type }) => {
    const notification = createNotificationObject({
      userRole,
      userId,
      title,
      message,
      type,
    });

    setAndSave((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications],
    }));

    return notification;
  };

  const markNotificationRead = (notificationId) => {
    setAndSave((prev) => ({
      ...prev,
      notifications: prev.notifications.map((item) =>
        item.id === notificationId ? { ...item, read: true } : item
      ),
    }));
  };

  const createHomework = (payload) => {
    const teacher = getTeacher(payload.teacherId || 1);

    const homework = {
      id: Date.now(),
      title: payload.title,
      description: payload.description || "",
      classId: payload.classId || teacher?.classId || 1,
      className: payload.className || teacher?.className || "10th A",
      subject: payload.subject || teacher?.subject || "Mathematics",
      teacherId: teacher?.id || 1,
      teacherName: teacher?.name || "Teacher",
      dueDate: payload.dueDate,
      instructions: payload.instructions || "",
      attachmentName: payload.attachmentName || "",
      createdAt: now(),
    };

    const targetStudents = state.students.filter(
      (student) => student.classId === homework.classId
    );

    const notifications = [];

    targetStudents.forEach((student) => {
      notifications.push(
        createNotificationObject({
          userRole: "STUDENT",
          userId: student.id,
          title: "New Homework",
          message: homework.title + " assigned in " + homework.subject,
          type: "HOMEWORK_CREATED",
        })
      );

      notifications.push(
        createNotificationObject({
          userRole: "PARENT",
          userId: student.parentId,
          title: "Homework Assigned",
          message: homework.title + " assigned to " + student.name,
          type: "HOMEWORK_CREATED",
        })
      );
    });

    setAndSave((prev) => ({
      ...prev,
      homework: [homework, ...prev.homework],
      notifications: [...notifications, ...prev.notifications],
    }));

    return homework;
  };

  const getHomeworkStatus = (homeworkId, studentId = 1) => {
    const submission = state.homeworkSubmissions.find(
      (item) => item.homeworkId === homeworkId && item.studentId === studentId
    );

    return submission?.status || "PENDING";
  };

  const submitHomework = ({ homeworkId, studentId = 1, submissionText, fileName }) => {
    const homework = state.homework.find((item) => item.id === homeworkId);
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);

    const alreadySubmitted = state.homeworkSubmissions.find(
      (item) => item.homeworkId === homeworkId && item.studentId === studentId
    );

    if (alreadySubmitted) {
      return {
        success: false,
        message: "Homework already submitted.",
      };
    }

    const today = new Date();
    const dueDate = homework?.dueDate ? new Date(homework.dueDate) : today;
    const status = today > dueDate ? "LATE" : "SUBMITTED";

    const submission = {
      id: Date.now(),
      homeworkId,
      homeworkTitle: homework?.title || "Homework",
      studentId,
      studentName: student?.name || "Student",
      parentId: parent?.id,
      teacherId: homework?.teacherId || 1,
      submissionText,
      fileName: fileName || "",
      status,
      teacherRemark: "",
      submittedAt: now(),
      reviewedAt: "",
    };

    setAndSave((prev) => ({
      ...prev,
      homeworkSubmissions: [submission, ...prev.homeworkSubmissions],
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: homework?.teacherId || 1,
          title: "Homework Submitted",
          message: submission.studentName + " submitted " + submission.homeworkTitle,
          type: "HOMEWORK_SUBMITTED",
        }),
        ...prev.notifications,
      ],
    }));

    return {
      success: true,
      data: submission,
    };
  };

  const reviewHomework = ({ submissionId, teacherRemark }) => {
    let reviewedSubmission = null;

    setAndSave((prev) => {
      const submissions = prev.homeworkSubmissions.map((item) => {
        if (item.id === submissionId) {
          reviewedSubmission = {
            ...item,
            status: "REVIEWED",
            teacherRemark,
            reviewedAt: now(),
          };
          return reviewedSubmission;
        }

        return item;
      });

      const notifications = reviewedSubmission
        ? [
            createNotificationObject({
              userRole: "STUDENT",
              userId: reviewedSubmission.studentId,
              title: "Homework Reviewed",
              message: reviewedSubmission.homeworkTitle + " was reviewed by teacher.",
              type: "HOMEWORK_REVIEWED",
            }),
            createNotificationObject({
              userRole: "PARENT",
              userId: reviewedSubmission.parentId,
              title: "Homework Reviewed",
              message: reviewedSubmission.studentName + "'s homework was reviewed.",
              type: "HOMEWORK_REVIEWED",
            }),
          ]
        : [];

      return {
        ...prev,
        homeworkSubmissions: submissions,
        notifications: [...notifications, ...prev.notifications],
      };
    });

    return reviewedSubmission;
  };

  const createExam = (payload) => {
    const teacher = getTeacher(payload.teacherId || 1);

    const exam = {
      id: Date.now(),
      title: payload.title,
      classId: payload.classId || teacher?.classId || 1,
      className: payload.className || teacher?.className || "10th A",
      subject: payload.subject || teacher?.subject || "Mathematics",
      examDate: payload.examDate,
      startTime: payload.startTime || "",
      syllabus: payload.syllabus || "",
      instructions: payload.instructions || "",
      teacherId: teacher?.id || 1,
      createdAt: now(),
    };

    const targetStudents = state.students.filter(
      (student) => student.classId === exam.classId
    );

    const notifications = [];

    targetStudents.forEach((student) => {
      notifications.push(
        createNotificationObject({
          userRole: "STUDENT",
          userId: student.id,
          title: "Exam Scheduled",
          message: exam.title + " scheduled on " + exam.examDate,
          type: "EXAM_CREATED",
        })
      );

      notifications.push(
        createNotificationObject({
          userRole: "PARENT",
          userId: student.parentId,
          title: "Exam Scheduled",
          message: exam.title + " scheduled for " + student.name,
          type: "EXAM_CREATED",
        })
      );
    });

    setAndSave((prev) => ({
      ...prev,
      exams: [exam, ...prev.exams],
      notifications: [...notifications, ...prev.notifications],
    }));

    return exam;
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "Needs Improvement";
  };

  const uploadMarks = ({
    examId,
    studentId = 1,
    subject,
    marksObtained,
    totalMarks,
    remark,
  }) => {
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);
    const percentage = Math.round((Number(marksObtained) / Number(totalMarks)) * 100);
    const grade = calculateGrade(percentage);

    const mark = {
      id: Date.now(),
      examId,
      studentId,
      studentName: student?.name || "Student",
      parentId: parent?.id,
      subject,
      marksObtained: Number(marksObtained),
      totalMarks: Number(totalMarks),
      percentage,
      grade,
      remark: remark || "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      marks: [mark, ...prev.marks],
      students: prev.students.map((item) =>
        item.id === studentId
          ? { ...item, performancePercentage: percentage }
          : item
      ),
      notifications: [
        createNotificationObject({
          userRole: "STUDENT",
          userId: studentId,
          title: "Marks Uploaded",
          message: subject + " marks uploaded. Grade: " + grade,
          type: "MARKS_UPLOADED",
        }),
        createNotificationObject({
          userRole: "PARENT",
          userId: parent?.id,
          title: "Marks Uploaded",
          message: student?.name + "'s " + subject + " marks are available.",
          type: "MARKS_UPLOADED",
        }),
        ...prev.notifications,
      ],
    }));

    return mark;
  };

  const markAttendance = ({ studentId = 1, subject, date, status, remark }) => {
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);

    const record = {
      id: Date.now(),
      studentId,
      studentName: student?.name || "Student",
      parentId: parent?.id,
      classId: student?.classId || 1,
      subject,
      date,
      status,
      remark: remark || "",
      createdAt: now(),
    };

    setAndSave((prev) => {
      const studentRecords = [
        record,
        ...prev.attendance.filter((item) => item.studentId === studentId),
      ];

      const presentCount = studentRecords.filter(
        (item) => item.status === "PRESENT" || item.status === "LATE" || item.status === "LEAVE"
      ).length;

      const percentage = Math.round((presentCount / studentRecords.length) * 100);

      return {
        ...prev,
        attendance: [record, ...prev.attendance],
        students: prev.students.map((item) =>
          item.id === studentId
            ? { ...item, attendancePercentage: percentage }
            : item
        ),
        notifications: [
          createNotificationObject({
            userRole: "PARENT",
            userId: parent?.id,
            title: status === "ABSENT" ? "Absent Alert" : "Attendance Updated",
            message: student?.name + " marked " + status,
            type: status === "ABSENT" ? "STUDENT_ABSENT" : "ATTENDANCE_MARKED",
          }),
          createNotificationObject({
            userRole: "STUDENT",
            userId: studentId,
            title: "Attendance Updated",
            message: "You were marked " + status,
            type: "ATTENDANCE_MARKED",
          }),
          ...prev.notifications,
        ],
      };
    });

    return record;
  };

  const addTask = ({ studentId = 1, title, subject, priority, dueDate }) => {
    const task = {
      id: Date.now(),
      studentId,
      title,
      subject,
      priority: priority || "MEDIUM",
      dueDate,
      status: "PENDING",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      tasks: [task, ...prev.tasks],
    }));

    return task;
  };

  const updateTaskStatus = (taskId, status) => {
    setAndSave((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    }));
  };

  const addStudyPlan = ({ studentId = 1, subject, chapterName, targetDate }) => {
    const plan = {
      id: Date.now(),
      studentId,
      subject,
      chapterName,
      targetDate,
      progressPercentage: 0,
      status: "PENDING",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      studyPlans: [plan, ...prev.studyPlans],
    }));

    return plan;
  };

  const updateStudyPlanProgress = (planId, progressPercentage) => {
    setAndSave((prev) => ({
      ...prev,
      studyPlans: prev.studyPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              progressPercentage,
              status: progressPercentage >= 100 ? "COMPLETED" : "IN_PROGRESS",
            }
          : plan
      ),
    }));
  };

  const addWeakTopic = ({ studentId = 1, subject, topicName, reason, teacherRemark }) => {
    const weakTopic = {
      id: Date.now(),
      studentId,
      subject,
      topicName,
      reason,
      improvementStatus: "NEEDS_PRACTICE",
      teacherRemark: teacherRemark || "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      weakTopics: [weakTopic, ...prev.weakTopics],
    }));

    return weakTopic;
  };

  const uploadNotes = ({ title, subject, classId = 1, teacherId = 1, type }) => {
    const note = {
      id: Date.now(),
      title,
      subject,
      classId,
      teacherId,
      type: type || "PDF",
      readBy: [],
      createdAt: now(),
    };

    const targetStudents = state.students.filter((student) => student.classId === classId);

    const notifications = [];

    targetStudents.forEach((student) => {
      notifications.push(
        createNotificationObject({
          userRole: "STUDENT",
          userId: student.id,
          title: "New Study Material",
          message: title + " uploaded for " + subject,
          type: "NOTES_UPLOADED",
        })
      );
    });

    setAndSave((prev) => ({
      ...prev,
      notes: [note, ...prev.notes],
      notifications: [...notifications, ...prev.notifications],
    }));

    return note;
  };

  const markNotesAsRead = ({ noteId, studentId = 1 }) => {
    setAndSave((prev) => ({
      ...prev,
      notes: prev.notes.map((note) =>
        note.id === noteId
          ? { ...note, readBy: Array.from(new Set([...(note.readBy || []), studentId])) }
          : note
      ),
    }));
  };

  const askDoubt = ({ studentId = 1, subject, doubtText, attachmentName }) => {
    const student = getStudent(studentId);

    const doubt = {
      id: Date.now(),
      studentId,
      studentName: student?.name || "Student",
      subject,
      doubtText,
      attachmentName: attachmentName || "",
      answerText: "",
      status: "PENDING",
      createdAt: now(),
      answeredAt: "",
    };

    setAndSave((prev) => ({
      ...prev,
      doubts: [doubt, ...prev.doubts],
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: 1,
          title: "New Doubt",
          message: student?.name + " asked a doubt in " + subject,
          type: "DOUBT_ASKED",
        }),
        ...prev.notifications,
      ],
    }));

    return doubt;
  };

  const answerDoubt = ({ doubtId, answerText }) => {
    let doubt = null;

    setAndSave((prev) => {
      const doubts = prev.doubts.map((item) => {
        if (item.id === doubtId) {
          doubt = {
            ...item,
            answerText,
            status: "ANSWERED",
            answeredAt: now(),
          };
          return doubt;
        }

        return item;
      });

      return {
        ...prev,
        doubts,
        notifications: doubt
          ? [
              createNotificationObject({
                userRole: "STUDENT",
                userId: doubt.studentId,
                title: "Doubt Answered",
                message: "Teacher answered your doubt.",
                type: "DOUBT_ANSWERED",
              }),
              ...prev.notifications,
            ]
          : prev.notifications,
      };
    });
  };

  const markDoubtSolved = (doubtId) => {
    setAndSave((prev) => ({
      ...prev,
      doubts: prev.doubts.map((item) =>
        item.id === doubtId ? { ...item, status: "SOLVED" } : item
      ),
    }));
  };

  const sendFeedback = ({ studentId = 1, teacherId = 1, subject, type, message }) => {
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);
    const teacher = getTeacher(teacherId);

    const feedback = {
      id: Date.now(),
      studentId,
      studentName: student?.name,
      parentId: parent?.id,
      teacherId,
      teacherName: teacher?.name,
      subject,
      type,
      message,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      feedback: [feedback, ...prev.feedback],
      notifications: [
        createNotificationObject({
          userRole: "STUDENT",
          userId: studentId,
          title: "Teacher Feedback",
          message,
          type: "FEEDBACK_SENT",
        }),
        createNotificationObject({
          userRole: "PARENT",
          userId: parent?.id,
          title: "Teacher Feedback",
          message: "Feedback received for " + student?.name,
          type: "FEEDBACK_SENT",
        }),
        ...prev.notifications,
      ],
    }));

    return feedback;
  };

  const requestMeeting = ({ parentId = 1, teacherId = 1, studentId = 1, reason, preferredDate, preferredTime }) => {
    const parent = state.parents.find((item) => item.id === parentId);
    const teacher = getTeacher(teacherId);
    const student = getStudent(studentId);

    const meeting = {
      id: Date.now(),
      parentId,
      parentName: parent?.name || "Parent",
      teacherId,
      teacherName: teacher?.name || "Teacher",
      studentId,
      studentName: student?.name || "Student",
      reason,
      preferredDate,
      preferredTime,
      status: "REQUESTED",
      teacherNote: "",
      meetingLink: "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      meetings: [meeting, ...prev.meetings],
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: teacherId,
          title: "Meeting Requested",
          message: meeting.parentName + " requested a meeting.",
          type: "MEETING_REQUESTED",
        }),
        ...prev.notifications,
      ],
    }));

    return meeting;
  };

  const updateMeetingStatus = ({ meetingId, status, teacherNote, meetingLink }) => {
    let meeting = null;

    setAndSave((prev) => {
      const meetings = prev.meetings.map((item) => {
        if (item.id === meetingId) {
          meeting = {
            ...item,
            status,
            teacherNote: teacherNote || item.teacherNote,
            meetingLink: meetingLink || item.meetingLink,
          };
          return meeting;
        }

        return item;
      });

      return {
        ...prev,
        meetings,
        notifications: meeting
          ? [
              createNotificationObject({
                userRole: "PARENT",
                userId: meeting.parentId,
                title: "Meeting " + status,
                message: "Teacher updated your meeting request.",
                type: "MEETING_STATUS_UPDATED",
              }),
              ...prev.notifications,
            ]
          : prev.notifications,
      };
    });
  };

  const createTimetablePeriod = ({ classId = 1, day, period, subject, teacher, room, time }) => {
    const timetablePeriod = {
      id: Date.now(),
      classId,
      day,
      period,
      subject,
      teacher,
      room,
      time,
    };

    setAndSave((prev) => ({
      ...prev,
      timetable: [timetablePeriod, ...prev.timetable],
    }));

    return timetablePeriod;
  };

  const createDailyDiary = ({ classId = 1, date, classSummary, homeworkSummary, reminders }) => {
    const diary = {
      id: Date.now(),
      classId,
      className: "10th A",
      date,
      classSummary,
      homeworkSummary,
      reminders,
      acknowledgements: [],
      createdAt: now(),
    };

    const targetStudents = state.students.filter((student) => student.classId === classId);

    const notifications = [];

    targetStudents.forEach((student) => {
      notifications.push(
        createNotificationObject({
          userRole: "PARENT",
          userId: student.parentId,
          title: "Daily Diary Posted",
          message: "Teacher posted today's diary.",
          type: "DIARY_CREATED",
        })
      );
    });

    setAndSave((prev) => ({
      ...prev,
      diary: [diary, ...prev.diary],
      notifications: [...notifications, ...prev.notifications],
    }));

    return diary;
  };

  const acknowledgeDiary = ({ diaryId, parentId = 1 }) => {
    setAndSave((prev) => ({
      ...prev,
      diary: prev.diary.map((item) =>
        item.id === diaryId
          ? {
              ...item,
              acknowledgements: Array.from(new Set([...(item.acknowledgements || []), parentId])),
            }
          : item
      ),
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: 1,
          title: "Diary Acknowledged",
          message: "Parent acknowledged daily diary.",
          type: "DIARY_ACKNOWLEDGED",
        }),
        ...prev.notifications,
      ],
    }));
  };

  const submitLeaveRequest = ({ studentId = 1, parentId, reason, fromDate, toDate, message }) => {
    const student = getStudent(studentId);
    const parent = state.parents.find((item) => item.id === (parentId || student?.parentId));

    const leave = {
      id: Date.now(),
      studentId,
      studentName: student?.name,
      parentId: parent?.id,
      parentName: parent?.name,
      reason,
      fromDate,
      toDate,
      message: message || "",
      status: "REQUESTED",
      teacherRemark: "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      leaveRequests: [leave, ...prev.leaveRequests],
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: 1,
          title: "Leave Requested",
          message: student?.name + " requested leave.",
          type: "LEAVE_REQUESTED",
        }),
        ...prev.notifications,
      ],
    }));

    return leave;
  };

  const updateLeaveStatus = ({ leaveId, status, teacherRemark }) => {
    let leave = null;

    setAndSave((prev) => {
      const leaveRequests = prev.leaveRequests.map((item) => {
        if (item.id === leaveId) {
          leave = {
            ...item,
            status,
            teacherRemark: teacherRemark || "",
          };
          return leave;
        }

        return item;
      });

      let newAttendance = prev.attendance;

      if (leave?.status === "APPROVED") {
        newAttendance = [
          {
            id: Date.now() + 10,
            studentId: leave.studentId,
            studentName: leave.studentName,
            parentId: leave.parentId,
            classId: 1,
            subject: "Leave",
            date: leave.fromDate,
            status: "LEAVE",
            remark: leave.reason,
            createdAt: now(),
          },
          ...prev.attendance,
        ];
      }

      return {
        ...prev,
        leaveRequests,
        attendance: newAttendance,
        notifications: leave
          ? [
              createNotificationObject({
                userRole: "PARENT",
                userId: leave.parentId,
                title: "Leave " + status,
                message: "Teacher updated leave request.",
                type: "LEAVE_STATUS_UPDATED",
              }),
              createNotificationObject({
                userRole: "STUDENT",
                userId: leave.studentId,
                title: "Leave " + status,
                message: "Your leave request was updated.",
                type: "LEAVE_STATUS_UPDATED",
              }),
              ...prev.notifications,
            ]
          : prev.notifications,
      };
    });
  };

  const addBehaviorRecord = ({ studentId = 1, type, points, remark }) => {
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);

    const behaviorRecord = {
      id: Date.now(),
      studentId,
      studentName: student?.name,
      type,
      points: Number(points),
      remark,
      createdAt: now(),
    };

    setAndSave((prev) => {
      const oldScore = student?.behaviorScore || 80;
      const nextScore = Math.max(0, Math.min(100, oldScore + Number(points)));

      return {
        ...prev,
        behavior: [behaviorRecord, ...prev.behavior],
        students: prev.students.map((item) =>
          item.id === studentId ? { ...item, behaviorScore: nextScore } : item
        ),
        notifications: [
          createNotificationObject({
            userRole: "PARENT",
            userId: parent?.id,
            title: "Behavior Update",
            message: student?.name + " received behavior update.",
            type: "BEHAVIOR_ADDED",
          }),
          ...prev.notifications,
        ],
      };
    });

    return behaviorRecord;
  };

  const awardAchievement = ({ studentId = 1, title, description, awardedBy }) => {
    const student = getStudent(studentId);
    const parent = getParentByStudent(studentId);

    const achievement = {
      id: Date.now(),
      studentId,
      studentName: student?.name,
      title,
      description,
      awardedBy: awardedBy || "Teacher",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      achievements: [achievement, ...prev.achievements],
      notifications: [
        createNotificationObject({
          userRole: "STUDENT",
          userId: studentId,
          title: "Achievement Awarded",
          message: "You received " + title,
          type: "ACHIEVEMENT_AWARDED",
        }),
        createNotificationObject({
          userRole: "PARENT",
          userId: parent?.id,
          title: "Achievement Awarded",
          message: student?.name + " received " + title,
          type: "ACHIEVEMENT_AWARDED",
        }),
        ...prev.notifications,
      ],
    }));

    return achievement;
  };

  const createFee = ({ title, amount, dueDate, studentId = 1 }) => {
    const student = getStudent(studentId);

    const fee = {
      id: Date.now(),
      title,
      classId: student?.classId || 1,
      amount: Number(amount),
      dueDate,
      status: "PENDING",
      paymentProof: "",
      studentId,
      parentId: student?.parentId,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      fees: [fee, ...prev.fees],
      notifications: [
        createNotificationObject({
          userRole: "PARENT",
          userId: student?.parentId,
          title: "Fee Due",
          message: title + " fee added. Amount: ₹" + amount,
          type: "FEE_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return fee;
  };

  const uploadPaymentProof = ({ feeId, paymentProof }) => {
    let fee = null;

    setAndSave((prev) => {
      const fees = prev.fees.map((item) => {
        if (item.id === feeId) {
          fee = {
            ...item,
            status: "SUBMITTED",
            paymentProof,
          };
          return fee;
        }

        return item;
      });

      return {
        ...prev,
        fees,
        notifications: [
          createNotificationObject({
            userRole: "ADMIN",
            userId: 1,
            title: "Payment Proof Submitted",
            message: "Parent submitted payment proof.",
            type: "PAYMENT_PROOF_SUBMITTED",
          }),
          ...prev.notifications,
        ],
      };
    });
  };

  const verifyFeePayment = ({ feeId, status }) => {
    let fee = null;

    setAndSave((prev) => {
      const fees = prev.fees.map((item) => {
        if (item.id === feeId) {
          fee = {
            ...item,
            status,
          };
          return fee;
        }

        return item;
      });

      return {
        ...prev,
        fees,
        notifications: fee
          ? [
              createNotificationObject({
                userRole: "PARENT",
                userId: fee.parentId,
                title: "Fee " + status,
                message: "Admin updated payment status.",
                type: "PAYMENT_VERIFIED",
              }),
              ...prev.notifications,
            ]
          : prev.notifications,
      };
    });
  };

  const createDigitalId = ({ userRole, userId, studentId }) => {
    const student = getStudent(studentId);

    const card = {
      id: Date.now(),
      userRole,
      userId,
      studentId,
      name: student?.name || "User",
      className: student?.className || "",
      rollNumber: student?.rollNumber || "",
      bloodGroup: student?.bloodGroup || "",
      emergencyContact: student?.emergencyContact || "",
      cardNumber: "SB-" + userRole + "-" + Date.now(),
      qrValue: "STUDYBRIDGE-" + userRole + "-" + userId,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      digitalIds: [card, ...prev.digitalIds],
      notifications: [
        createNotificationObject({
          userRole,
          userId,
          title: "Digital ID Created",
          message: "Your digital ID card is ready.",
          type: "DIGITAL_ID_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return card;
  };

  const createEvent = ({ title, description, eventDate, targetRole, classId }) => {
    const event = {
      id: Date.now(),
      title,
      description,
      eventDate,
      targetRole: targetRole || "ALL",
      classId: classId || 1,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      events: [event, ...prev.events],
      notifications: [
        createNotificationObject({
          userRole: "STUDENT",
          userId: 1,
          title: "New Event",
          message: title,
          type: "EVENT_CREATED",
        }),
        createNotificationObject({
          userRole: "PARENT",
          userId: 1,
          title: "New Event",
          message: title,
          type: "EVENT_CREATED",
        }),
        createNotificationObject({
          userRole: "TEACHER",
          userId: 1,
          title: "New Event",
          message: title,
          type: "EVENT_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return event;
  };

  const sendAnnouncement = ({ title, message, targetRole, classId }) => {
    const announcement = {
      id: Date.now(),
      title,
      message,
      targetRole: targetRole || "ALL",
      classId: classId || 1,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      announcements: [announcement, ...prev.announcements],
      notifications: [
        createNotificationObject({
          userRole: targetRole === "ALL" ? "STUDENT" : targetRole,
          userId: 1,
          title,
          message,
          type: "ANNOUNCEMENT_SENT",
        }),
        ...prev.notifications,
      ],
    }));

    return announcement;
  };

  const sendMessage = ({ senderRole, receiverRole, senderName, receiverName, message }) => {
    const newMessage = {
      id: Date.now(),
      senderRole,
      receiverRole,
      senderName: senderName || senderRole,
      receiverName: receiverName || receiverRole,
      message,
      read: false,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      notifications: [
        createNotificationObject({
          userRole: receiverRole,
          userId: 1,
          title: "New Message",
          message,
          type: "MESSAGE_SENT",
        }),
        ...prev.notifications,
      ],
    }));

    return newMessage;
  };

  const getStudentDashboard = (studentId = 1) => {
    const student = getStudent(studentId);

    return {
      student,
      pendingHomeworkCount: state.homework.filter(
        (homework) => getHomeworkStatus(homework.id, studentId) === "PENDING"
      ).length,
      upcomingExamCount: state.exams.filter(
        (exam) => exam.classId === student?.classId
      ).length,
      attendancePercentage: student?.attendancePercentage || 0,
      performancePercentage: student?.performancePercentage || 0,
      feeDueCount: state.fees.filter(
        (fee) => fee.studentId === studentId && fee.status !== "VERIFIED"
      ).length,
      behaviorScore: student?.behaviorScore || 0,
      achievementCount: state.achievements.filter(
        (item) => item.studentId === studentId
      ).length,
    };
  };

  const getParentDashboard = (parentId = 1) => {
    const parent = state.parents.find((item) => item.id === parentId);
    const student = getStudent(parent?.childId || 1);
    const studentDashboard = getStudentDashboard(student?.id || 1);

    return {
      parent,
      child: student,
      ...studentDashboard,
      diaryPendingCount: state.diary.filter(
        (item) => !(item.acknowledgements || []).includes(parentId)
      ).length,
      meetingsCount: state.meetings.filter((item) => item.parentId === parentId).length,
    };
  };

  const getTeacherDashboard = (teacherId = 1) => {
    return {
      teacher: getTeacher(teacherId),
      assignedClassesCount: 1,
      totalStudents: state.students.length,
      pendingHomeworkReviews: state.homeworkSubmissions.filter(
        (item) => item.status === "SUBMITTED" || item.status === "LATE"
      ).length,
      pendingLeaveRequests: state.leaveRequests.filter(
        (item) => item.status === "REQUESTED"
      ).length,
      pendingMeetingRequests: state.meetings.filter(
        (item) => item.status === "REQUESTED"
      ).length,
      pendingDoubts: state.doubts.filter((item) => item.status === "PENDING").length,
    };
  };

  const getAdminDashboard = () => {
    return {
      totalStudents: state.students.length,
      totalTeachers: state.teachers.length,
      totalParents: state.parents.length,
      totalClasses: state.classes.length,
      totalFees: state.fees.length,
      pendingFeeVerifications: state.fees.filter((fee) => fee.status === "SUBMITTED").length,
      pendingLeaveRequests: state.leaveRequests.filter(
        (item) => item.status === "REQUESTED"
      ).length,
    };
  };


  const addStudent = (payload) => {
    const student = {
      id: Date.now(),
      name: payload.name,
      classId: payload.classId || 1,
      className: payload.className || "10th A",
      rollNumber: payload.rollNumber,
      parentId: payload.parentId || 1,
      attendancePercentage: 0,
      performancePercentage: 0,
      behaviorScore: 80,
      bloodGroup: payload.bloodGroup || "",
      emergencyContact: payload.emergencyContact || "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      students: [student, ...prev.students],
      notifications: [
        createNotificationObject({
          userRole: "ADMIN",
          userId: 1,
          title: "Student Added",
          message: student.name + " added successfully.",
          type: "STUDENT_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return student;
  };

  const addTeacher = (payload) => {
    const teacher = {
      id: Date.now(),
      name: payload.name,
      subject: payload.subject,
      classId: payload.classId || 1,
      className: payload.className || "10th A",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      teachers: [teacher, ...prev.teachers],
      notifications: [
        createNotificationObject({
          userRole: "ADMIN",
          userId: 1,
          title: "Teacher Added",
          message: teacher.name + " added successfully.",
          type: "TEACHER_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return teacher;
  };

  const addParent = (payload) => {
    const student = state.students.find((s) => s.id === Number(payload.childId));

    const parent = {
      id: Date.now(),
      name: payload.name,
      childId: Number(payload.childId),
      childName: student?.name || "Student",
      phone: payload.phone || "",
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      parents: [parent, ...prev.parents],
      students: prev.students.map((s) =>
        s.id === Number(payload.childId) ? { ...s, parentId: parent.id } : s
      ),
      notifications: [
        createNotificationObject({
          userRole: "ADMIN",
          userId: 1,
          title: "Parent Added",
          message: parent.name + " linked with " + parent.childName,
          type: "PARENT_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return parent;
  };

  const addClass = (payload) => {
    const schoolClass = {
      id: Date.now(),
      name: payload.className + " " + payload.section,
      className: payload.className,
      section: payload.section,
      academicYear: payload.academicYear || "2026-2027",
      studentsCount: 0,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      classes: [schoolClass, ...prev.classes],
      notifications: [
        createNotificationObject({
          userRole: "ADMIN",
          userId: 1,
          title: "Class Created",
          message: schoolClass.name + " created.",
          type: "CLASS_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return schoolClass;
  };

  const addSubject = (payload) => {
    const subject = {
      id: Date.now(),
      name: payload.name,
      classId: payload.classId || 1,
      createdAt: now(),
    };

    setAndSave((prev) => ({
      ...prev,
      subjects: [subject, ...prev.subjects],
      notifications: [
        createNotificationObject({
          userRole: "ADMIN",
          userId: 1,
          title: "Subject Added",
          message: subject.name + " added.",
          type: "SUBJECT_CREATED",
        }),
        ...prev.notifications,
      ],
    }));

    return subject;
  };

  const assignTeacher = (payload) => {
    const teacherId = Number(payload.teacherId);
    const classId = Number(payload.classId);
    const classObj = state.classes.find((c) => c.id === classId);

    setAndSave((prev) => ({
      ...prev,
      teachers: prev.teachers.map((teacher) =>
        teacher.id === teacherId
          ? {
              ...teacher,
              classId,
              className: classObj?.name || teacher.className,
              subject: payload.subject || teacher.subject,
            }
          : teacher
      ),
      notifications: [
        createNotificationObject({
          userRole: "TEACHER",
          userId: teacherId,
          title: "Class Assigned",
          message: "You are assigned to " + (classObj?.name || "class"),
          type: "TEACHER_ASSIGNED",
        }),
        ...prev.notifications,
      ],
    }));
  };


  const value = useMemo(
    () => ({
      ...state,
      appLoading,

      resetAppData,

      addStudent,
      addTeacher,
      addParent,
      addClass,
      addSubject,
      assignTeacher,

      addNotification,
      markNotificationRead,

      createHomework,
      getHomeworkStatus,
      submitHomework,
      reviewHomework,

      createExam,
      uploadMarks,
      markAttendance,

      addTask,
      updateTaskStatus,
      addStudyPlan,
      updateStudyPlanProgress,
      addWeakTopic,

      uploadNotes,
      markNotesAsRead,

      askDoubt,
      answerDoubt,
      markDoubtSolved,

      sendFeedback,

      requestMeeting,
      updateMeetingStatus,

      createTimetablePeriod,

      createDailyDiary,
      acknowledgeDiary,

      submitLeaveRequest,
      updateLeaveStatus,

      addBehaviorRecord,
      awardAchievement,

      createFee,
      uploadPaymentProof,
      verifyFeePayment,

      createDigitalId,

      createEvent,
      sendAnnouncement,

      sendMessage,

      getStudentDashboard,
      getParentDashboard,
      getTeacherDashboard,
      getAdminDashboard,
    }),
    [state, appLoading]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
