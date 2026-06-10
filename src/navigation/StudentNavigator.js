import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

import StudentDashboardScreen from "../screens/student/StudentDashboardScreen";
import StudentHomeworkScreen from "../screens/student/StudentHomeworkScreen";
import HomeworkDetailsScreen from "../screens/student/HomeworkDetailsScreen";
import SubmitHomeworkScreen from "../screens/student/SubmitHomeworkScreen";
import ExamPlannerScreen from "../screens/student/ExamPlannerScreen";
import ExamDetailsScreen from "../screens/student/ExamDetailsScreen";
import StudyPlanScreen from "../screens/student/StudyPlanScreen";
import DailyTasksScreen from "../screens/student/DailyTasksScreen";
import AddTaskScreen from "../screens/student/AddTaskScreen";
import RevisionScreen from "../screens/student/RevisionScreen";
import MockTestScreen from "../screens/student/MockTestScreen";
import MockTestResultScreen from "../screens/student/MockTestResultScreen";
import StudentProgressScreen from "../screens/student/StudentProgressScreen";
import WeakTopicsScreen from "../screens/student/WeakTopicsScreen";
import StudentFeedbackScreen from "../screens/student/StudentFeedbackScreen";
import StudentEventsScreen from "../screens/student/StudentEventsScreen";
import StudentNotesScreen from "../screens/student/StudentNotesScreen";
import AskDoubtScreen from "../screens/student/AskDoubtScreen";
import DoubtDiscussionScreen from "../screens/student/DoubtDiscussionScreen";
import StudentChatScreen from "../screens/student/StudentChatScreen";
import StudentNotificationsScreen from "../screens/student/StudentNotificationsScreen";
import StudentProfileScreen from "../screens/student/StudentProfileScreen";
import StudentTimetableScreen from "../screens/student/StudentTimetableScreen";
import StudentDailyDiaryScreen from "../screens/student/StudentDailyDiaryScreen";
import StudentLeaveRequestScreen from "../screens/student/StudentLeaveRequestScreen";
import StudentBehaviorScreen from "../screens/student/StudentBehaviorScreen";
import StudentAchievementsScreen from "../screens/student/StudentAchievementsScreen";
import StudentFeesScreen from "../screens/student/StudentFeesScreen";
import StudentDigitalIdScreen from "../screens/student/StudentDigitalIdScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StudentTabs() {
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
      <Tab.Screen name="Home" component={StudentDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Homework" component={StudentHomeworkScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Planner" component={ExamPlannerScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Progress" component={StudentProgressScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="trending-up-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={StudentProfileScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function StudentNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentTabs" component={StudentTabs} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} />
      <Stack.Screen name="StudentHomework" component={StudentHomeworkScreen} />
      <Stack.Screen name="HomeworkDetails" component={HomeworkDetailsScreen} />
      <Stack.Screen name="SubmitHomework" component={SubmitHomeworkScreen} />
      <Stack.Screen name="ExamPlanner" component={ExamPlannerScreen} />
      <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
      <Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
      <Stack.Screen name="DailyTasks" component={DailyTasksScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="Revision" component={RevisionScreen} />
      <Stack.Screen name="MockTest" component={MockTestScreen} />
      <Stack.Screen name="MockTestResult" component={MockTestResultScreen} />
      <Stack.Screen name="StudentProgress" component={StudentProgressScreen} />
      <Stack.Screen name="WeakTopics" component={WeakTopicsScreen} />
      <Stack.Screen name="StudentFeedback" component={StudentFeedbackScreen} />
      <Stack.Screen name="StudentEvents" component={StudentEventsScreen} />
      <Stack.Screen name="StudentNotes" component={StudentNotesScreen} />
      <Stack.Screen name="AskDoubt" component={AskDoubtScreen} />
      <Stack.Screen name="DoubtDiscussion" component={DoubtDiscussionScreen} />
      <Stack.Screen name="StudentChat" component={StudentChatScreen} />
      <Stack.Screen name="StudentNotifications" component={StudentNotificationsScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="StudentTimetable" component={StudentTimetableScreen} />
      <Stack.Screen name="StudentDailyDiary" component={StudentDailyDiaryScreen} />
      <Stack.Screen name="StudentLeaveRequest" component={StudentLeaveRequestScreen} />
      <Stack.Screen name="StudentBehavior" component={StudentBehaviorScreen} />
      <Stack.Screen name="StudentAchievements" component={StudentAchievementsScreen} />
      <Stack.Screen name="StudentFees" component={StudentFeesScreen} />
      <Stack.Screen name="StudentDigitalId" component={StudentDigitalIdScreen} />
    </Stack.Navigator>
  );
}
