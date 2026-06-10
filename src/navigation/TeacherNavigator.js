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

function TeacherNavigatorTabs() {
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
        name="TeacherDashboard"
        component={TeacherDashboardScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="grid-outline"
              label="Home"
              color="#06B6D4"
            />
          ),
        }}
      />

      <Tab.Screen
        name="TeacherClasses"
        component={TeacherClassesScreen}
        options={{
          title: "Classes",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="school-outline"
              label="Classes"
              color="#4F46E5"
            />
          ),
        }}
      />

      <Tab.Screen
        name="AssignHomework"
        component={AssignHomeworkScreen}
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
        name="HomeworkSubmissions"
        component={HomeworkSubmissionsScreen}
        options={{
          title: "Review",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="documents-outline"
              label="Review"
              color="#7C3AED"
            />
          ),
        }}
      />

      <Tab.Screen
        name="TeacherProfile"
        component={TeacherProfileScreen}
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

export default function TeacherNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="TeacherNavigatorTabs" component={TeacherNavigatorTabs} />

      <Stack.Screen name="StudentList" component={StudentListScreen} />
      <Stack.Screen name="CreateExam" component={CreateExamScreen} />
      <Stack.Screen name="UploadMarks" component={UploadMarksScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="UploadNotes" component={UploadNotesScreen} />
      <Stack.Screen name="TeacherFeedback" component={TeacherFeedbackScreen} />
      <Stack.Screen name="TeacherEvents" component={TeacherEventsScreen} />
      <Stack.Screen name="TeacherChat" component={TeacherChatScreen} />
      <Stack.Screen name="TeacherNotifications" component={TeacherNotificationsScreen} />
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
