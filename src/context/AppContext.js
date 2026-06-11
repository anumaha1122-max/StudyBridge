import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AppContext = createContext(null);

const makeId = () => Date.now() + Math.floor(Math.random() * 100000);

const today = () => new Date().toISOString().slice(0, 10);

const INITIAL_STATE = {
  students: [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@student.com",
      phone: "9876543210",
      className: "Class 10",
      parentName: "Suresh Kumar",
      status: "ACTIVE",
      attendancePercentage: 86,
      performancePercentage: 78,
    },
  ],

  teachers: [
    {
      id: 1,
      name: "Mr. Kumar",
      email: "kumar@school.com",
      phone: "9876500001",
      subject: "Mathematics",
      qualification: "M.Sc, B.Ed",
      status: "ACTIVE",
    },
  ],

  parents: [
    {
      id: 1,
      name: "Suresh Kumar",
      email: "parent@school.com",
      phone: "9876543210",
      childName: "Rahul Kumar",
      childId: 1,
      status: "ACTIVE",
    },
  ],

  classes: [
    {
      id: 1,
      name: "Class 10",
      section: "A",
      classTeacher: "Mr. Kumar",
      room: "Room 101",
      status: "ACTIVE",
    },
  ],

  subjects: [
    {
      id: 1,
      name: "Mathematics",
      className: "Class 10",
      teacherName: "Mr. Kumar",
      status: "ACTIVE",
    },
  ],

  teacherAssignments: [],

  homework: [
    {
      id: 1,
      title: "Algebra Practice",
      subject: "Mathematics",
      description: "Complete exercise 2.1 problems 1 to 10.",
      dueDate: today(),
      teacherName: "Mr. Kumar",
      className: "Class 10",
      status: "PENDING",
    },
  ],

  homeworkSubmissions: [],

  exams: [
    {
      id: 1,
      title: "Unit Test 1",
      subject: "Mathematics",
      syllabus: "Algebra and Geometry",
      examDate: today(),
      status: "UPCOMING",
    },
  ],

  attendance: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Kumar",
      date: today(),
      status: "PRESENT",
      remark: "Present",
    },
  ],

  marks: [
    {
      id: 1,
      studentId: 1,
      studentName: "Rahul Kumar",
      subject: "Mathematics",
      examTitle: "Unit Test 1",
      marksObtained: 78,
      totalMarks: 100,
      remark: "Good",
      status: "RESULT",
    },
  ],

  fees: [
    {
      id: 1,
      title: "Term 1 Fee",
      className: "Class 10",
      amount: "25000",
      dueDate: today(),
      status: "PENDING",
      paymentProof: "",
    },
  ],

  leaveRequests: [],

  achievements: [],

  behaviorRecords: [],

  meetings: [],

  notes: [
    {
      id: 1,
      title: "Algebra Notes",
      subject: "Mathematics",
      description: "Important formulas and solved examples.",
      type: "PDF",
      status: "ACTIVE",
    },
  ],

  studyMaterials: [
    {
      id: 1,
      title: "Algebra Notes",
      subject: "Mathematics",
      description: "Important formulas and solved examples.",
      type: "PDF",
      status: "ACTIVE",
    },
  ],

  materialReads: [],

  doubts: [],

  tasks: [],

  dailyTasks: [],

  diary: [],

  dailyDiary: [],

  timetable: [
    {
      id: 1,
      day: "Monday",
      className: "Class 10",
      period: "1",
      subject: "Mathematics",
      teacher: "Mr. Kumar",
      time: "09:00 AM - 09:45 AM",
      room: "Room 101",
      status: "ACTIVE",
    },
  ],

  events: [],

  announcements: [],

  notifications: [
    {
      id: 1,
      title: "Welcome to StudyBridge",
      message: "Your school app is ready.",
      role: "ALL",
      status: "UNREAD",
      date: today(),
      icon: "notifications-outline",
    },
  ],

  feedback: [],
};

export function AppProvider({ children }) {
  const [students, setStudents] = useState(INITIAL_STATE.students);
  const [teachers, setTeachers] = useState(INITIAL_STATE.teachers);
  const [parents, setParents] = useState(INITIAL_STATE.parents);
  const [classes, setClasses] = useState(INITIAL_STATE.classes);
  const [subjects, setSubjects] = useState(INITIAL_STATE.subjects);
  const [teacherAssignments, setTeacherAssignments] = useState(INITIAL_STATE.teacherAssignments);

  const [homework, setHomework] = useState(INITIAL_STATE.homework);
  const [homeworkSubmissions, setHomeworkSubmissions] = useState(INITIAL_STATE.homeworkSubmissions);
  const [exams, setExams] = useState(INITIAL_STATE.exams);
  const [attendance, setAttendance] = useState(INITIAL_STATE.attendance);
  const [marks, setMarks] = useState(INITIAL_STATE.marks);

  const [fees, setFees] = useState(INITIAL_STATE.fees);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_STATE.leaveRequests);
  const [achievements, setAchievements] = useState(INITIAL_STATE.achievements);
  const [behaviorRecords, setBehaviorRecords] = useState(INITIAL_STATE.behaviorRecords);
  const [meetings, setMeetings] = useState(INITIAL_STATE.meetings);

  const [notes, setNotes] = useState(INITIAL_STATE.notes);
  const [studyMaterials, setStudyMaterials] = useState(INITIAL_STATE.studyMaterials);
  const [materialReads, setMaterialReads] = useState(INITIAL_STATE.materialReads);

  const [doubts, setDoubts] = useState(INITIAL_STATE.doubts);
  const [tasks, setTasks] = useState(INITIAL_STATE.tasks);
  const [dailyTasks, setDailyTasks] = useState(INITIAL_STATE.dailyTasks);

  const [diary, setDiary] = useState(INITIAL_STATE.diary);
  const [dailyDiary, setDailyDiary] = useState(INITIAL_STATE.dailyDiary);

  const [timetable, setTimetable] = useState(INITIAL_STATE.timetable);
  const [events, setEvents] = useState(INITIAL_STATE.events);
  const [announcements, setAnnouncements] = useState(INITIAL_STATE.announcements);
  const [notifications, setNotifications] = useState(INITIAL_STATE.notifications);
  const [feedback, setFeedback] = useState(INITIAL_STATE.feedback);

  const pushNotification = ({
    title,
    message,
    role = "ALL",
    icon = "notifications-outline",
  }) => {
    setNotifications((prev) => [
      {
        id: makeId(),
        title,
        message,
        role,
        icon,
        status: "UNREAD",
        date: today(),
      },
      ...prev,
    ]);
  };

  const addStudent = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setStudents((prev) => [item, ...prev]);

    pushNotification({
      title: "New Student Added",
      message: item.name + " profile created successfully.",
      role: "ADMIN",
      icon: "person-add-outline",
    });
  };

  const addTeacher = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setTeachers((prev) => [item, ...prev]);

    pushNotification({
      title: "New Teacher Added",
      message: item.name + " profile created successfully.",
      role: "ADMIN",
      icon: "school-outline",
    });
  };

  const addParent = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setParents((prev) => [item, ...prev]);

    pushNotification({
      title: "New Parent Added",
      message: item.name + " parent profile created.",
      role: "ADMIN",
      icon: "people-outline",
    });
  };

  const addClass = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setClasses((prev) => [item, ...prev]);
  };

  const addSubject = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setSubjects((prev) => [item, ...prev]);
  };

  const assignTeacher = (payload) => {
    const item = {
      id: makeId(),
      status: "ASSIGNED",
      ...payload,
    };

    setTeacherAssignments((prev) => [item, ...prev]);

    pushNotification({
      title: "Teacher Assigned",
      message: item.teacherName + " assigned to " + item.className + " " + item.section,
      role: "TEACHER",
      icon: "git-branch-outline",
    });
  };

  const createHomework = (payload) => {
    const item = {
      id: makeId(),
      status: "PENDING",
      dueDate: payload.dueDate || today(),
      ...payload,
    };

    setHomework((prev) => [item, ...prev]);

    pushNotification({
      title: "New Homework",
      message: item.title + " assigned for " + item.subject,
      role: "STUDENT",
      icon: "book-outline",
    });

    pushNotification({
      title: "Child Homework",
      message: item.title + " assigned for " + item.subject,
      role: "PARENT",
      icon: "book-outline",
    });
  };

  const submitHomework = (payload) => {
    const item = {
      id: makeId(),
      submittedAt: today(),
      status: "SUBMITTED",
      ...payload,
    };

    setHomeworkSubmissions((prev) => [item, ...prev]);

    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === item.homeworkId
          ? { ...hw, status: "SUBMITTED" }
          : hw
      )
    );

    pushNotification({
      title: "Homework Submitted",
      message: item.studentName + " submitted " + item.title,
      role: "TEACHER",
      icon: "cloud-upload-outline",
    });
  };

  const reviewHomework = (submissionId, review = {}) => {
    setHomeworkSubmissions((prev) =>
      prev.map((item) =>
        item.id === submissionId
          ? {
              ...item,
              ...review,
              status: "REVIEWED",
              reviewedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Homework Reviewed",
      message: "Your homework has been reviewed by teacher.",
      role: "STUDENT",
      icon: "checkmark-circle-outline",
    });
  };

  const createExam = (payload) => {
    const item = {
      id: makeId(),
      status: "UPCOMING",
      ...payload,
    };

    setExams((prev) => [item, ...prev]);

    pushNotification({
      title: "New Exam Scheduled",
      message: item.title + " scheduled for " + item.subject,
      role: "STUDENT",
      icon: "calendar-outline",
    });

    pushNotification({
      title: "Child Exam Scheduled",
      message: item.title + " scheduled for " + item.subject,
      role: "PARENT",
      icon: "calendar-outline",
    });
  };

  const uploadMarks = (payload) => {
    const item = {
      id: makeId(),
      status: "RESULT",
      ...payload,
    };

    setMarks((prev) => [item, ...prev]);

    pushNotification({
      title: "Marks Uploaded",
      message: "New marks uploaded for " + item.subject,
      role: "STUDENT",
      icon: "bar-chart-outline",
    });

    pushNotification({
      title: "Child Marks Uploaded",
      message: "New marks uploaded for " + item.subject,
      role: "PARENT",
      icon: "bar-chart-outline",
    });
  };

  const markAttendance = (payload) => {
    const item = {
      id: makeId(),
      date: payload.date || today(),
      status: payload.status || "PRESENT",
      ...payload,
    };

    setAttendance((prev) => [item, ...prev]);

    if (item.status !== "PRESENT") {
      pushNotification({
        title: "Attendance Alert",
        message: item.studentName + " marked as " + item.status,
        role: "PARENT",
        icon: "warning-outline",
      });
    }
  };

  const createFee = (payload) => {
    const item = {
      id: makeId(),
      status: "PENDING",
      ...payload,
    };

    setFees((prev) => [item, ...prev]);

    pushNotification({
      title: "New Fee Created",
      message: item.title + " amount ₹" + item.amount,
      role: "PARENT",
      icon: "card-outline",
    });
  };

  const uploadPaymentProof = (payload) => {
    const feeId = payload.feeId || payload.id;

    setFees((prev) =>
      prev.map((item) =>
        item.id === feeId
          ? {
              ...item,
              paymentProof: payload.paymentProof || payload.attachmentName || "payment-proof.jpg",
              status: "SUBMITTED",
              submittedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Payment Proof Submitted",
      message: "Parent uploaded payment proof for verification.",
      role: "ADMIN",
      icon: "card-outline",
    });
  };

  const verifyPaymentProof = (feeId) => {
    setFees((prev) =>
      prev.map((item) =>
        item.id === feeId
          ? {
              ...item,
              status: "VERIFIED",
              verifiedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Payment Verified",
      message: "Your fee payment proof was verified.",
      role: "PARENT",
      icon: "shield-checkmark-outline",
    });
  };

  const rejectPaymentProof = (feeId) => {
    setFees((prev) =>
      prev.map((item) =>
        item.id === feeId
          ? {
              ...item,
              status: "REJECTED",
              rejectedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Payment Rejected",
      message: "Your fee payment proof was rejected. Please upload again.",
      role: "PARENT",
      icon: "close-circle-outline",
    });
  };

  const requestLeave = (payload) => {
    const item = {
      id: makeId(),
      status: "REQUESTED",
      requestedAt: today(),
      ...payload,
    };

    setLeaveRequests((prev) => [item, ...prev]);

    pushNotification({
      title: "Leave Request",
      message: (item.studentName || "Student") + " requested leave.",
      role: "TEACHER",
      icon: "mail-outline",
    });

    pushNotification({
      title: "Leave Request",
      message: (item.studentName || "Student") + " requested leave.",
      role: "ADMIN",
      icon: "mail-outline",
    });
  };

  const approveLeave = (id) => {
    setLeaveRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "APPROVED",
              updatedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Leave Approved",
      message: "Your leave request was approved.",
      role: "STUDENT",
      icon: "checkmark-circle-outline",
    });

    pushNotification({
      title: "Child Leave Approved",
      message: "Your child's leave request was approved.",
      role: "PARENT",
      icon: "checkmark-circle-outline",
    });
  };

  const rejectLeave = (id) => {
    setLeaveRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "REJECTED",
              updatedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Leave Rejected",
      message: "Your leave request was rejected.",
      role: "STUDENT",
      icon: "close-circle-outline",
    });

    pushNotification({
      title: "Child Leave Rejected",
      message: "Your child's leave request was rejected.",
      role: "PARENT",
      icon: "close-circle-outline",
    });
  };

  const requestMeeting = (payload) => {
    const item = {
      id: makeId(),
      status: "REQUESTED",
      requestedAt: today(),
      ...payload,
    };

    setMeetings((prev) => [item, ...prev]);

    pushNotification({
      title: "Meeting Request",
      message: (item.parentName || "Parent") + " requested a meeting.",
      role: "TEACHER",
      icon: "people-outline",
    });
  };

  const acceptMeeting = (id) => {
    setMeetings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "ACCEPTED",
              updatedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Meeting Accepted",
      message: "Teacher accepted your meeting request.",
      role: "PARENT",
      icon: "checkmark-circle-outline",
    });
  };

  const rescheduleMeeting = (id) => {
    setMeetings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "RESCHEDULED",
              updatedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Meeting Rescheduled",
      message: "Teacher requested to reschedule your meeting.",
      role: "PARENT",
      icon: "time-outline",
    });
  };

  const rejectMeeting = (id) => {
    setMeetings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "REJECTED",
              updatedAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Meeting Rejected",
      message: "Teacher rejected your meeting request.",
      role: "PARENT",
      icon: "close-circle-outline",
    });
  };

  const awardAchievement = (payload) => {
    const item = {
      id: makeId(),
      status: "AWARDED",
      date: today(),
      ...payload,
    };

    setAchievements((prev) => [item, ...prev]);

    pushNotification({
      title: "New Achievement",
      message: item.title + " awarded to " + item.studentName,
      role: "STUDENT",
      icon: "ribbon-outline",
    });

    pushNotification({
      title: "Child Achievement",
      message: item.title + " awarded to your child.",
      role: "PARENT",
      icon: "ribbon-outline",
    });
  };

  const addBehaviorRecord = (payload) => {
    const item = {
      id: makeId(),
      date: today(),
      status: "BEHAVIOR",
      ...payload,
    };

    setBehaviorRecords((prev) => [item, ...prev]);

    pushNotification({
      title: "Behavior Record",
      message: "New behavior record added.",
      role: "STUDENT",
      icon: "star-outline",
    });

    pushNotification({
      title: "Child Behavior Record",
      message: "New behavior record added for your child.",
      role: "PARENT",
      icon: "star-outline",
    });
  };

  const uploadNotes = (payload) => {
    const item = {
      id: makeId(),
      type: payload.type || "PDF",
      status: "ACTIVE",
      uploadedAt: today(),
      ...payload,
    };

    setNotes((prev) => [item, ...prev]);
    setStudyMaterials((prev) => [item, ...prev]);

    pushNotification({
      title: "New Study Material",
      message: item.title + " uploaded for " + item.subject,
      role: "STUDENT",
      icon: "document-text-outline",
    });
  };

  const markMaterialRead = (materialId) => {
    setMaterialReads((prev) => {
      const exists = prev.some((item) => item.materialId === materialId);
      if (exists) return prev;

      return [
        {
          id: makeId(),
          materialId,
          readAt: today(),
        },
        ...prev,
      ];
    });
  };

  const askDoubt = (payload) => {
    const item = {
      id: makeId(),
      status: "PENDING",
      askedAt: today(),
      ...payload,
    };

    setDoubts((prev) => [item, ...prev]);

    pushNotification({
      title: "New Doubt",
      message: (item.studentName || "Student") + " asked a doubt.",
      role: "TEACHER",
      icon: "help-circle-outline",
    });
  };

  const answerDoubt = (id, answerText) => {
    setDoubts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              answerText,
              status: "ANSWERED",
              answeredAt: today(),
            }
          : item
      )
    );

    pushNotification({
      title: "Doubt Answered",
      message: "Your teacher answered your doubt.",
      role: "STUDENT",
      icon: "help-circle-outline",
    });
  };

  const markDoubtSolved = (id) => {
    setDoubts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "SOLVED",
              solvedAt: today(),
            }
          : item
      )
    );
  };

  const addTask = (payload) => {
    const item = {
      id: makeId(),
      status: "PENDING",
      date: payload.date || today(),
      ...payload,
    };

    setTasks((prev) => [item, ...prev]);
    setDailyTasks((prev) => [item, ...prev]);
  };

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "COMPLETED",
              completedAt: today(),
            }
          : item
      )
    );

    setDailyTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "COMPLETED",
              completedAt: today(),
            }
          : item
      )
    );
  };

  const createDailyDiary = (payload) => {
    const item = {
      id: makeId(),
      date: payload.date || today(),
      status: "DIARY",
      acknowledgements: [],
      ...payload,
    };

    setDiary((prev) => [item, ...prev]);
    setDailyDiary((prev) => [item, ...prev]);

    pushNotification({
      title: "Daily Diary Added",
      message: "Teacher added today's class diary.",
      role: "STUDENT",
      icon: "journal-outline",
    });

    pushNotification({
      title: "Child Daily Diary",
      message: "Teacher added today's diary for your child.",
      role: "PARENT",
      icon: "journal-outline",
    });
  };

  const acknowledgeDiary = (payload) => {
    const diaryId = typeof payload === "object" ? payload.diaryId : payload;
    const ackId = typeof payload === "object" ? payload.parentId || payload.studentId || 1 : 1;

    const updateList = (prev) =>
      prev.map((item) => {
        if (item.id !== diaryId) return item;

        const oldAcks = item.acknowledgements || [];
        const exists = oldAcks.includes(ackId);

        return {
          ...item,
          acknowledgements: exists ? oldAcks : [...oldAcks, ackId],
        };
      });

    setDiary(updateList);
    setDailyDiary(updateList);
  };

  const addTimetable = (payload) => {
    const item = {
      id: makeId(),
      status: "ACTIVE",
      ...payload,
    };

    setTimetable((prev) => [item, ...prev]);

    pushNotification({
      title: "Timetable Updated",
      message: "School timetable has been updated.",
      role: "ALL",
      icon: "time-outline",
    });
  };

  const createEvent = (payload) => {
    const item = {
      id: makeId(),
      type: payload.type || "EVENT",
      status: "EVENT",
      date: payload.date || today(),
      ...payload,
    };

    setEvents((prev) => [item, ...prev]);

    pushNotification({
      title: "School Event",
      message: item.title + " has been added.",
      role: "ALL",
      icon: "calendar-clear-outline",
    });
  };

  const createAnnouncement = (payload) => {
    const item = {
      id: makeId(),
      audience: payload.audience || "ALL",
      priority: payload.priority || "NORMAL",
      date: payload.date || today(),
      status: "NOTICE",
      ...payload,
    };

    setAnnouncements((prev) => [item, ...prev]);

    pushNotification({
      title: item.title || "Announcement",
      message: item.message || "New school announcement.",
      role: item.audience || "ALL",
      icon: "megaphone-outline",
    });
  };

  const addFeedback = (payload) => {
    const item = {
      id: makeId(),
      status: "NEW",
      createdAt: today(),
      ...payload,
    };

    setFeedback((prev) => [item, ...prev]);

    pushNotification({
      title: "New Feedback",
      message: "Teacher added feedback.",
      role: "STUDENT",
      icon: "chatbubble-ellipses-outline",
    });

    pushNotification({
      title: "Child Feedback",
      message: "Teacher added feedback for your child.",
      role: "PARENT",
      icon: "chatbubble-ellipses-outline",
    });
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "READ",
            }
          : item
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        status: "READ",
      }))
    );
  };

  const resetAppData = () => {
    setStudents(INITIAL_STATE.students);
    setTeachers(INITIAL_STATE.teachers);
    setParents(INITIAL_STATE.parents);
    setClasses(INITIAL_STATE.classes);
    setSubjects(INITIAL_STATE.subjects);
    setTeacherAssignments(INITIAL_STATE.teacherAssignments);

    setHomework(INITIAL_STATE.homework);
    setHomeworkSubmissions(INITIAL_STATE.homeworkSubmissions);
    setExams(INITIAL_STATE.exams);
    setAttendance(INITIAL_STATE.attendance);
    setMarks(INITIAL_STATE.marks);

    setFees(INITIAL_STATE.fees);
    setLeaveRequests(INITIAL_STATE.leaveRequests);
    setAchievements(INITIAL_STATE.achievements);
    setBehaviorRecords(INITIAL_STATE.behaviorRecords);
    setMeetings(INITIAL_STATE.meetings);

    setNotes(INITIAL_STATE.notes);
    setStudyMaterials(INITIAL_STATE.studyMaterials);
    setMaterialReads(INITIAL_STATE.materialReads);

    setDoubts(INITIAL_STATE.doubts);
    setTasks(INITIAL_STATE.tasks);
    setDailyTasks(INITIAL_STATE.dailyTasks);

    setDiary(INITIAL_STATE.diary);
    setDailyDiary(INITIAL_STATE.dailyDiary);

    setTimetable(INITIAL_STATE.timetable);
    setEvents(INITIAL_STATE.events);
    setAnnouncements(INITIAL_STATE.announcements);
    setNotifications(INITIAL_STATE.notifications);
    setFeedback(INITIAL_STATE.feedback);
  };

  const value = useMemo(
    () => ({
      students,
      teachers,
      parents,
      classes,
      subjects,
      teacherAssignments,

      homework,
      homeworkSubmissions,
      exams,
      attendance,
      marks,

      fees,
      leaveRequests,
      achievements,
      behaviorRecords,
      meetings,

      notes,
      studyMaterials,
      materialReads,

      doubts,
      tasks,
      dailyTasks,

      diary,
      dailyDiary,

      timetable,
      events,
      announcements,
      notifications,
      feedback,

      addStudent,
      addTeacher,
      addParent,
      addClass,
      addSubject,
      assignTeacher,

      createHomework,
      submitHomework,
      reviewHomework,
      createExam,
      uploadMarks,
      markAttendance,

      createFee,
      uploadPaymentProof,
      verifyPaymentProof,
      rejectPaymentProof,

      requestLeave,
      approveLeave,
      rejectLeave,

      requestMeeting,
      acceptMeeting,
      rescheduleMeeting,
      rejectMeeting,

      awardAchievement,
      addBehaviorRecord,

      uploadNotes,
      markMaterialRead,

      askDoubt,
      answerDoubt,
      markDoubtSolved,

      addTask,
      completeTask,

      createDailyDiary,
      acknowledgeDiary,

      addTimetable,
      createEvent,
      createAnnouncement,
      addFeedback,

      markNotificationRead,
      markAllNotificationsRead,

      pushNotification,
      resetAppData,
    }),
    [
      students,
      teachers,
      parents,
      classes,
      subjects,
      teacherAssignments,

      homework,
      homeworkSubmissions,
      exams,
      attendance,
      marks,

      fees,
      leaveRequests,
      achievements,
      behaviorRecords,
      meetings,

      notes,
      studyMaterials,
      materialReads,

      doubts,
      tasks,
      dailyTasks,

      diary,
      dailyDiary,

      timetable,
      events,
      announcements,
      notifications,
      feedback,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}

export default AppContext;
