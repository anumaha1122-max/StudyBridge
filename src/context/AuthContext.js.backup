import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

const AUTH_USER_KEY = "STUDYBRIDGE_AUTH_USER";
const AUTH_USERS_KEY = "STUDYBRIDGE_USERS";

const seedUsers = [
  {
    id: 1,
    name: "Rahul Student",
    email: "student@studybridge.com",
    password: "student123",
    role: "STUDENT",
    studentId: 1,
    classId: 1,
    parentId: 1,
  },
  {
    id: 2,
    name: "Anitha Teacher",
    email: "teacher@studybridge.com",
    password: "teacher123",
    role: "TEACHER",
    teacherId: 1,
    classId: 1,
  },
  {
    id: 3,
    name: "Suresh Parent",
    email: "parent@studybridge.com",
    password: "parent123",
    role: "PARENT",
    parentId: 1,
    childId: 1,
  },
  {
    id: 4,
    name: "School Admin",
    email: "admin@studybridge.com",
    password: "admin123",
    role: "ADMIN",
    adminId: 1,
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    restoreAuth();
  }, []);

  const restoreAuth = async () => {
    try {
      const savedUsers = await AsyncStorage.getItem(AUTH_USERS_KEY);
      const savedUser = await AsyncStorage.getItem(AUTH_USER_KEY);

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        await AsyncStorage.setItem(AUTH_USERS_KEY, JSON.stringify(seedUsers));
      }

      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log("Auth restore error:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const persistUsers = async (nextUsers) => {
    setUsers(nextUsers);
    await AsyncStorage.setItem(AUTH_USERS_KEY, JSON.stringify(nextUsers));
  };

  const login = async ({ email, password, role }) => {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === String(email).toLowerCase() &&
        item.password === password &&
        item.role === role
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email, password, or selected role.",
      };
    }

    setCurrentUser(user);
    setSelectedRole(role);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      message: "Login successful",
      user,
    };
  };

  const register = async (payload) => {
    const exists = users.some(
      (item) => item.email.toLowerCase() === String(payload.email).toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role: payload.role,
    };

    const nextUsers = [newUser, ...users];
    await persistUsers(nextUsers);

    setCurrentUser(newUser);
    setSelectedRole(payload.role);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));

    return {
      success: true,
      message: "Registered successfully",
      user: newUser,
    };
  };

  const logout = async () => {
    setCurrentUser(null);
    setSelectedRole(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  };

  const resetAuthUsers = async () => {
    await persistUsers(seedUsers);
    setCurrentUser(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      selectedRole,
      setSelectedRole,
      isAuthenticated: !!currentUser,
      authLoading,
      login,
      register,
      logout,
      resetAuthUsers,
    }),
    [users, currentUser, selectedRole, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
