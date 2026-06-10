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

function ParentNavigatorTabs() {
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
        name="ParentDashboard"
        component={ParentDashboardScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="grid-outline"
              label="Home"
              color="#F97316"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChildHomework"
        component={ChildHomeworkScreen}
        options={{
          title: "Work",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="book-outline"
              label="Work"
              color="#4F46E5"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChildPerformance"
        component={ChildPerformanceScreen}
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
        name="ParentFees"
        component={ParentFeesScreen}
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
        name="ParentProfile"
        component={ParentProfileScreen}
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

export default function ParentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="ParentNavigatorTabs" component={ParentNavigatorTabs} />

      <Stack.Screen name="ChildAttendance" component={ChildAttendanceScreen} />
      <Stack.Screen name="ChildExamSchedule" component={ChildExamScheduleScreen} />
      <Stack.Screen name="ChildMarks" component={ChildMarksScreen} />
      <Stack.Screen name="ParentFeedback" component={ParentFeedbackScreen} />
      <Stack.Screen name="ParentEvents" component={ParentEventsScreen} />
      <Stack.Screen name="ParentChat" component={ParentChatScreen} />
      <Stack.Screen name="ParentMeetingRequest" component={ParentMeetingRequestScreen} />
      <Stack.Screen name="ParentNotifications" component={ParentNotificationsScreen} />
      <Stack.Screen name="ChildTimetable" component={ChildTimetableScreen} />
      <Stack.Screen name="ChildDailyDiary" component={ChildDailyDiaryScreen} />
      <Stack.Screen name="ParentLeaveRequest" component={ParentLeaveRequestScreen} />
      <Stack.Screen name="ChildBehavior" component={ChildBehaviorScreen} />
      <Stack.Screen name="ChildAchievements" component={ChildAchievementsScreen} />
      <Stack.Screen name="ChildDigitalId" component={ChildDigitalIdScreen} />

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
