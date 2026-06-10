import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

import TeacherDashboardScreen from "../screens/teacher/TeacherDashboardScreen";
import TeacherClassesScreen from "../screens/teacher/TeacherClassesScreen";
import StudentListScreen from "../screens/teacher/StudentListScreen";
import AssignHomeworkScreen from "../screens/teacher/AssignHomeworkScreen";
import HomeworkSubmissionsScreen from "../screens/teacher/HomeworkSubmissionsScreen";
import CreateExamScreen from "../screens/teacher/CreateExamScreen";
import UploadMarksScreen from "../screens/teacher/UploadMarksScreen";
import AttendanceScreen from "../screens/teacher/AttendanceScreen";
import CreateTaskScreen from "../screens/teacher/CreateTaskScreen";
import UploadNotesScreen from "../screens/teacher/UploadNotesScreen";
import TeacherFeedbackScreen from "../screens/teacher/TeacherFeedbackScreen";
import TeacherEventsScreen from "../screens/teacher/TeacherEventsScreen";
import TeacherChatScreen from "../screens/teacher/TeacherChatScreen";
import TeacherNotificationsScreen from "../screens/teacher/TeacherNotificationsScreen";
import TeacherProfileScreen from "../screens/teacher/TeacherProfileScreen";
import TeacherTimetableScreen from "../screens/teacher/TeacherTimetableScreen";
import TeacherDailyDiaryScreen from "../screens/teacher/TeacherDailyDiaryScreen";
import CreateDailyDiaryScreen from "../screens/teacher/CreateDailyDiaryScreen";
import TeacherLeaveRequestsScreen from "../screens/teacher/TeacherLeaveRequestsScreen";
import TeacherMeetingRequestsScreen from "../screens/teacher/TeacherMeetingRequestsScreen";
import TeacherBehaviorScreen from "../screens/teacher/TeacherBehaviorScreen";
import AwardAchievementScreen from "../screens/teacher/AwardAchievementScreen";
import StudyMaterialProgressScreen from "../screens/teacher/StudyMaterialProgressScreen";
import TeacherDoubtBoardScreen from "../screens/teacher/TeacherDoubtBoardScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TeacherTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 66,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },
      }}
    >
      <Tab.Screen name="Home" component={TeacherDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Classes" component={TeacherClassesScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="school-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Homework" component={AssignHomeworkScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Reports" component={HomeworkSubmissionsScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={TeacherProfileScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function TeacherNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeacherTabs" component={TeacherTabs} />
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
      <Stack.Screen name="TeacherClasses" component={TeacherClassesScreen} />
      <Stack.Screen name="StudentList" component={StudentListScreen} />
      <Stack.Screen name="AssignHomework" component={AssignHomeworkScreen} />
      <Stack.Screen name="HomeworkSubmissions" component={HomeworkSubmissionsScreen} />
      <Stack.Screen name="CreateExam" component={CreateExamScreen} />
      <Stack.Screen name="UploadMarks" component={UploadMarksScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="UploadNotes" component={UploadNotesScreen} />
      <Stack.Screen name="TeacherFeedback" component={TeacherFeedbackScreen} />
      <Stack.Screen name="TeacherEvents" component={TeacherEventsScreen} />
      <Stack.Screen name="TeacherChat" component={TeacherChatScreen} />
      <Stack.Screen name="TeacherNotifications" component={TeacherNotificationsScreen} />
      <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
      <Stack.Screen name="TeacherTimetable" component={TeacherTimetableScreen} />
      <Stack.Screen name="TeacherDailyDiary" component={TeacherDailyDiaryScreen} />
      <Stack.Screen name="CreateDailyDiary" component={CreateDailyDiaryScreen} />
      <Stack.Screen name="TeacherLeaveRequests" component={TeacherLeaveRequestsScreen} />
      <Stack.Screen name="TeacherMeetingRequests" component={TeacherMeetingRequestsScreen} />
      <Stack.Screen name="TeacherBehavior" component={TeacherBehaviorScreen} />
      <Stack.Screen name="AwardAchievement" component={AwardAchievementScreen} />
      <Stack.Screen name="StudyMaterialProgress" component={StudyMaterialProgressScreen} />
      <Stack.Screen name="TeacherDoubtBoard" component={TeacherDoubtBoardScreen} />
    </Stack.Navigator>
  );
}
