import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

import ParentDashboardScreen from "../screens/parent/ParentDashboardScreen";
import ChildPerformanceScreen from "../screens/parent/ChildPerformanceScreen";
import ChildHomeworkScreen from "../screens/parent/ChildHomeworkScreen";
import ChildAttendanceScreen from "../screens/parent/ChildAttendanceScreen";
import ChildExamScheduleScreen from "../screens/parent/ChildExamScheduleScreen";
import ChildMarksScreen from "../screens/parent/ChildMarksScreen";
import ParentFeedbackScreen from "../screens/parent/ParentFeedbackScreen";
import ParentEventsScreen from "../screens/parent/ParentEventsScreen";
import ParentChatScreen from "../screens/parent/ParentChatScreen";
import ParentMeetingRequestScreen from "../screens/parent/ParentMeetingRequestScreen";
import ParentNotificationsScreen from "../screens/parent/ParentNotificationsScreen";
import ParentProfileScreen from "../screens/parent/ParentProfileScreen";
import ChildTimetableScreen from "../screens/parent/ChildTimetableScreen";
import ChildDailyDiaryScreen from "../screens/parent/ChildDailyDiaryScreen";
import ParentLeaveRequestScreen from "../screens/parent/ParentLeaveRequestScreen";
import ChildBehaviorScreen from "../screens/parent/ChildBehaviorScreen";
import ChildAchievementsScreen from "../screens/parent/ChildAchievementsScreen";
import ParentFeesScreen from "../screens/parent/ParentFeesScreen";
import ChildDigitalIdScreen from "../screens/parent/ChildDigitalIdScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ParentTabs() {
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
      <Tab.Screen name="Home" component={ParentDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Performance" component={ChildPerformanceScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="trending-up-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Homework" component={ChildHomeworkScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Messages" component={ParentChatScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={ParentProfileScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function ParentNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentTabs" component={ParentTabs} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
      <Stack.Screen name="ChildPerformance" component={ChildPerformanceScreen} />
      <Stack.Screen name="ChildHomework" component={ChildHomeworkScreen} />
      <Stack.Screen name="ChildAttendance" component={ChildAttendanceScreen} />
      <Stack.Screen name="ChildExamSchedule" component={ChildExamScheduleScreen} />
      <Stack.Screen name="ChildMarks" component={ChildMarksScreen} />
      <Stack.Screen name="ParentFeedback" component={ParentFeedbackScreen} />
      <Stack.Screen name="ParentEvents" component={ParentEventsScreen} />
      <Stack.Screen name="ParentChat" component={ParentChatScreen} />
      <Stack.Screen name="ParentMeetingRequest" component={ParentMeetingRequestScreen} />
      <Stack.Screen name="ParentNotifications" component={ParentNotificationsScreen} />
      <Stack.Screen name="ParentProfile" component={ParentProfileScreen} />
      <Stack.Screen name="ChildTimetable" component={ChildTimetableScreen} />
      <Stack.Screen name="ChildDailyDiary" component={ChildDailyDiaryScreen} />
      <Stack.Screen name="ParentLeaveRequest" component={ParentLeaveRequestScreen} />
      <Stack.Screen name="ChildBehavior" component={ChildBehaviorScreen} />
      <Stack.Screen name="ChildAchievements" component={ChildAchievementsScreen} />
      <Stack.Screen name="ParentFees" component={ParentFeesScreen} />
      <Stack.Screen name="ChildDigitalId" component={ChildDigitalIdScreen} />
    </Stack.Navigator>
  );
}
