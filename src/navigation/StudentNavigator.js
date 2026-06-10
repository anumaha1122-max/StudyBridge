import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ focused, icon, label, color }) {
  return (
    <View style={[styles.tabItem, focused && styles.activeTabItem]}>
      <View
        style={[
          styles.iconBubble,
          focused && {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={focused ? 21 : 20}
          color={focused ? COLORS.white : COLORS.muted}
        />
      </View>

      <Text
        numberOfLines={1}
        style={[
          styles.tabLabel,
          focused && {
            color,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function StudentNavigatorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >

      <Tab.Screen
        name="StudentDashboard"
        component={StudentDashboardScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="grid-outline"
              label="Home"
              color="#4F46E5"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StudentHomework"
        component={StudentHomeworkScreen}
        options={{
          title: "Work",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="book-outline"
              label="Work"
              color="#F59E0B"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ExamPlanner"
        component={ExamPlannerScreen}
        options={{
          title: "Exams",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="calendar-outline"
              label="Exams"
              color="#06B6D4"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StudentProgress"
        component={StudentProgressScreen}
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="trending-up-outline"
              label="Progress"
              color="#7C3AED"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="person-outline"
              label="Profile"
              color="#16A34A"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function StudentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="StudentNavigatorTabs" component={StudentNavigatorTabs} />

      <Stack.Screen name="HomeworkDetails" component={HomeworkDetailsScreen} />
      <Stack.Screen name="SubmitHomework" component={SubmitHomeworkScreen} />
      <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
      <Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
      <Stack.Screen name="DailyTasks" component={DailyTasksScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="Revision" component={RevisionScreen} />
      <Stack.Screen name="MockTest" component={MockTestScreen} />
      <Stack.Screen name="MockTestResult" component={MockTestResultScreen} />
      <Stack.Screen name="WeakTopics" component={WeakTopicsScreen} />
      <Stack.Screen name="StudentFeedback" component={StudentFeedbackScreen} />
      <Stack.Screen name="StudentEvents" component={StudentEventsScreen} />
      <Stack.Screen name="StudentNotes" component={StudentNotesScreen} />
      <Stack.Screen name="AskDoubt" component={AskDoubtScreen} />
      <Stack.Screen name="DoubtDiscussion" component={DoubtDiscussionScreen} />
      <Stack.Screen name="StudentChat" component={StudentChatScreen} />
      <Stack.Screen name="StudentNotifications" component={StudentNotificationsScreen} />
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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: Platform.OS === "ios" ? 20 : 12,
    height: 76,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 10 : 8,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  tabBarItem: {
    height: 62,
  },
  tabItem: {
    width: 68,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabItem: {
    transform: [{ translateY: -2 }],
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background2,
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "900",
    marginTop: 4,
  },
});
