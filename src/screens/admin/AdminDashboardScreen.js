import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboardScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  
  const dashboard = app.getAdminDashboard
    ? app.getAdminDashboard()
    : {
        totalStudents: app.students?.length || 0,
        totalTeachers: app.teachers?.length || 0,
        totalParents: app.parents?.length || 0,
        totalClasses: app.classes?.length || 0,
        pendingFeeVerifications: app.fees?.filter((f) => f.status === "SUBMITTED").length || 0,
        pendingLeaveRequests: app.leaveRequests?.filter((l) => l.status === "REQUESTED").length || 0,
      };

  const notifications = app.notifications?.filter((n) => n.userRole === "ADMIN") || [];

  const quickActions = [
    {
      title: "Students",
      subtitle: "Add and manage student profiles",
      icon: "people-outline",
      route: "ManageStudents",
      color: COLORS.primary,
      badge: String(app.students?.length || 0),
    },
    {
      title: "Teachers",
      subtitle: "Manage teachers and subjects",
      icon: "school-outline",
      route: "ManageTeachers",
      color: COLORS.secondary,
      badge: String(app.teachers?.length || 0),
    },
    {
      title: "Classes",
      subtitle: "Create classes and sections",
      icon: "business-outline",
      route: "ManageClasses",
      color: COLORS.purple,
      badge: String(app.classes?.length || 0),
    },
    {
      title: "Fee Verification",
      subtitle: "Approve parent payment proofs",
      icon: "shield-checkmark-outline",
      route: "FeeVerification",
      color: COLORS.warning,
      badge: String(dashboard.pendingFeeVerifications || 0),
    },
    {
      title: "Reports",
      subtitle: "School academic and finance reports",
      icon: "bar-chart-outline",
      route: "Reports",
      color: COLORS.accent,
    },
    {
      title: "Announcements",
      subtitle: "Send updates to all users",
      icon: "megaphone-outline",
      route: "SchoolAnnouncements",
      color: COLORS.danger,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <View style={styles.heroTop}>
            <View style={styles.logoBox}>
              <Ionicons name="shield-checkmark-outline" size={30} color={COLORS.white} />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.notificationBtn}
              onPress={() => navigation.navigate("AdminNotifications")}
            >
              <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.heroTitle}>School Admin Panel</Text>
          <Text style={styles.heroSub}>
            Manage users, classes, fees, events, approvals and complete school reports.
          </Text>

          <View style={styles.rolePill}>
            <Text style={styles.rolePillText}>ADMIN ACCESS</Text>
          </View>
        </View>

        <View style={styles.statGrid}>
          <StatBox value={dashboard.totalStudents} label="Students" icon="people-outline" tone={COLORS.primary} />
          <StatBox value={dashboard.totalTeachers} label="Teachers" icon="school-outline" tone={COLORS.secondary} />
          <StatBox value={dashboard.totalParents} label="Parents" icon="people-circle-outline" tone={COLORS.accent} />
          <StatBox value={dashboard.totalClasses} label="Classes" icon="business-outline" tone={COLORS.purple} />
          <StatBox value={dashboard.pendingFeeVerifications} label="Fee Proofs" icon="cash-outline" tone={COLORS.warning} />
          <StatBox value={dashboard.pendingLeaveRequests} label="Leave Requests" icon="mail-outline" tone={COLORS.danger} />
        </View>

        <SectionTitle title="Admin Actions" action="View Reports" onPress={() => navigation.navigate("Reports")} />

        {quickActions.map((item) => (
          <QuickCard
            key={item.route}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            badge={item.badge}
            onPress={() => navigation.navigate(item.route)}
          />
        ))}

        <SectionTitle title="Recent Activity" action="All" onPress={() => navigation.navigate("AdminNotifications")} />

        {notifications.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="notifications-off-outline" size={34} color={COLORS.softText} />
            <Text style={styles.emptyText}>No admin notifications yet.</Text>
          </View>
        ) : (
          notifications.slice(0, 5).map((item) => (
            <ActivityCard
              key={item.id}
              title={item.title}
              message={item.message}
              status={item.read ? "READ" : "NEW"}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );

}

const StatBox = ({ value, label, icon, tone = COLORS.primary }) => (
  <View style={styles.statBox}>
    <View style={[styles.statIcon, { backgroundColor: tone + "18" }]}>
      <Ionicons name={icon} size={21} color={tone} />
    </View>
    <Text numberOfLines={1} style={styles.statValue}>{value}</Text>
    <Text numberOfLines={2} style={styles.statLabel}>{label}</Text>
  </View>
);

const QuickCard = ({ title, subtitle, icon, color = COLORS.primary, onPress, badge }) => (
  <TouchableOpacity activeOpacity={0.86} style={styles.quickCard} onPress={onPress}>
    <View style={[styles.quickIcon, { backgroundColor: color + "17" }]}>
      <Ionicons name={icon} size={23} color={color} />
    </View>

    <View style={{ flex: 1 }}>
      <Text numberOfLines={1} style={styles.quickTitle}>{title}</Text>
      <Text numberOfLines={2} style={styles.quickSub}>{subtitle}</Text>
    </View>

    {badge ? <Text style={[styles.badge, { color, backgroundColor: color + "14" }]}>{badge}</Text> : null}

    <Ionicons name="chevron-forward" size={20} color={COLORS.softText} />
  </TouchableOpacity>
);

const ActivityCard = ({ title, message, icon = "notifications-outline", status = "NEW" }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityIcon}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text numberOfLines={1} style={styles.activityTitle}>{title}</Text>
      <Text numberOfLines={2} style={styles.activityMsg}>{message}</Text>
    </View>
    <Text style={styles.statusBadge}>{status}</Text>
  </View>
);

const SectionTitle = ({ title, action, onPress }) => (
  <View style={styles.sectionRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action ? (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Text style={styles.sectionAction}>{action}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 32,
    padding: 20,
    minHeight: 210,
    overflow: "hidden",
    marginBottom: 16,
  },
  heroCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -62,
    top: -58,
    backgroundColor: "#7C3AED55",
  },
  heroCircleTwo: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    left: -55,
    bottom: -55,
    backgroundColor: "rgba(6,182,212,0.22)",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 22,
    lineHeight: 34,
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8,
  },
  rolePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 14,
  },
  rolePillText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statBox: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17,
    marginTop: 4,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
  },
  sectionAction: {
    color: "#7C3AED",
    fontSize: 13,
    fontWeight: "900",
  },
  quickCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  quickTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  quickSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 10,
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },
  activityMsg: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 3,
  },
  statusBadge: {
    backgroundColor: COLORS.warningLight,
    color: COLORS.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
  },
  emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center",
  },
});
