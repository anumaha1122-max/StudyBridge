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

function AdminNavigatorTabs() {
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
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="grid-outline"
              label="Home"
              color="#7C3AED"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ManageStudents"
        component={ManageStudentsScreen}
        options={{
          title: "Students",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="people-outline"
              label="Students"
              color="#4F46E5"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ManageFees"
        component={ManageFeesScreen}
        options={{
          title: "Fees",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="card-outline"
              label="Fees"
              color="#F59E0B"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: "Reports",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="bar-chart-outline"
              label="Reports"
              color="#06B6D4"
            />
          ),
        }}
      />

      <Tab.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
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

export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="AdminNavigatorTabs" component={AdminNavigatorTabs} />

      <Stack.Screen name="ManageTeachers" component={ManageTeachersScreen} />
      <Stack.Screen name="ManageParents" component={ManageParentsScreen} />
      <Stack.Screen name="ManageClasses" component={ManageClassesScreen} />
      <Stack.Screen name="ManageSubjects" component={ManageSubjectsScreen} />
      <Stack.Screen name="AssignTeacher" component={AssignTeacherScreen} />
      <Stack.Screen name="SchoolAnnouncements" component={SchoolAnnouncementsScreen} />
      <Stack.Screen name="SchoolEvents" component={SchoolEventsScreen} />
      <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} />
      <Stack.Screen name="ManageTimetable" component={ManageTimetableScreen} />
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
