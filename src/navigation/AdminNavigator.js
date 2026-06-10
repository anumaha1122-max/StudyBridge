import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ManageStudentsScreen from "../screens/admin/ManageStudentsScreen";
import ManageTeachersScreen from "../screens/admin/ManageTeachersScreen";
import ManageParentsScreen from "../screens/admin/ManageParentsScreen";
import ManageClassesScreen from "../screens/admin/ManageClassesScreen";
import ManageSubjectsScreen from "../screens/admin/ManageSubjectsScreen";
import AssignTeacherScreen from "../screens/admin/AssignTeacherScreen";
import SchoolAnnouncementsScreen from "../screens/admin/SchoolAnnouncementsScreen";
import SchoolEventsScreen from "../screens/admin/SchoolEventsScreen";
import ReportsScreen from "../screens/admin/ReportsScreen";
import AdminNotificationsScreen from "../screens/admin/AdminNotificationsScreen";
import AdminProfileScreen from "../screens/admin/AdminProfileScreen";
import ManageTimetableScreen from "../screens/admin/ManageTimetableScreen";
import ManageFeesScreen from "../screens/admin/ManageFeesScreen";
import FeeVerificationScreen from "../screens/admin/FeeVerificationScreen";
import ManageLeaveRequestsScreen from "../screens/admin/ManageLeaveRequestsScreen";
import ManageAchievementsScreen from "../screens/admin/ManageAchievementsScreen";
import ManageBehaviorScreen from "../screens/admin/ManageBehaviorScreen";
import ManageDailyDiaryScreen from "../screens/admin/ManageDailyDiaryScreen";
import DigitalIdManagementScreen from "../screens/admin/DigitalIdManagementScreen";
import AdminMeetingReportsScreen from "../screens/admin/AdminMeetingReportsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AdminTabs() {
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
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Users" component={ManageStudentsScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Classes" component={ManageClassesScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="school-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Events" component={SchoolEventsScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={AdminProfileScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="ManageStudents" component={ManageStudentsScreen} />
      <Stack.Screen name="ManageTeachers" component={ManageTeachersScreen} />
      <Stack.Screen name="ManageParents" component={ManageParentsScreen} />
      <Stack.Screen name="ManageClasses" component={ManageClassesScreen} />
      <Stack.Screen name="ManageSubjects" component={ManageSubjectsScreen} />
      <Stack.Screen name="AssignTeacher" component={AssignTeacherScreen} />
      <Stack.Screen name="SchoolAnnouncements" component={SchoolAnnouncementsScreen} />
      <Stack.Screen name="SchoolEvents" component={SchoolEventsScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} />
      <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
      <Stack.Screen name="ManageTimetable" component={ManageTimetableScreen} />
      <Stack.Screen name="ManageFees" component={ManageFeesScreen} />
      <Stack.Screen name="FeeVerification" component={FeeVerificationScreen} />
      <Stack.Screen name="ManageLeaveRequests" component={ManageLeaveRequestsScreen} />
      <Stack.Screen name="ManageAchievements" component={ManageAchievementsScreen} />
      <Stack.Screen name="ManageBehavior" component={ManageBehaviorScreen} />
      <Stack.Screen name="ManageDailyDiary" component={ManageDailyDiaryScreen} />
      <Stack.Screen name="DigitalIdManagement" component={DigitalIdManagementScreen} />
      <Stack.Screen name="AdminMeetingReports" component={AdminMeetingReportsScreen} />
    </Stack.Navigator>
  );
}
