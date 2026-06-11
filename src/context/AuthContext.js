import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@studybridge.com",
    password: "123456",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Teacher User",
    email: "teacher@studybridge.com",
    password: "123456",
    role: "TEACHER",
  },
  {
    id: 3,
    name: "Student User",
    email: "student@studybridge.com",
    password: "123456",
    role: "STUDENT",
    studentId: 1,
    className: "Class 10",
  },
  {
    id: 4,
    name: "Parent User",
    email: "parent@studybridge.com",
    password: "123456",
    role: "PARENT",
    parentId: 1,
    childId: 1,
    childName: "Rahul Kumar",
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const normalizeRole = (role) => {
    if (!role) return "STUDENT";

    const value = String(role).toUpperCase();

    if (value === "ADMIN") return "ADMIN";
    if (value === "TEACHER") return "TEACHER";
    if (value === "PARENT") return "PARENT";
    if (value === "STUDENT") return "STUDENT";

    return "STUDENT";
  };

  const selectRole = (role) => {
    setSelectedRole(normalizeRole(role));
  };

  const login = async ({ email, password, role } = {}) => {
    setLoading(true);

    const finalRole = normalizeRole(role || selectedRole);

    let foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === String(email || "").toLowerCase() &&
        item.password === password &&
        item.role === finalRole
    );

    if (!foundUser) {
      foundUser = users.find(
        (item) =>
          item.email?.toLowerCase() === String(email || "").toLowerCase() &&
          item.password === password
      );
    }

    if (!foundUser) {
      setLoading(false);
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const finalUser = {
      ...foundUser,
      role: normalizeRole(foundUser.role),
    };

    setCurrentUser(finalUser);
    setSelectedRole(finalUser.role);
    setLoading(false);

    return {
      success: true,
      user: finalUser,
    };
  };

  const register = async ({
    name,
    email,
    password,
    phone,
    role,
  } = {}) => {
    setLoading(true);

    const finalRole = normalizeRole(role || selectedRole);

    const exists = users.some(
      (item) => item.email?.toLowerCase() === String(email || "").toLowerCase()
    );

    if (exists) {
      setLoading(false);
      return {
        success: false,
        message: "Email already registered.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: name || "User",
      email,
      password,
      phone,
      role: finalRole,
      studentId: finalRole === "STUDENT" ? 1 : undefined,
      parentId: finalRole === "PARENT" ? 1 : undefined,
      childId: finalRole === "PARENT" ? 1 : undefined,
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setSelectedRole(finalRole);
    setLoading(false);

    return {
      success: true,
      user: newUser,
    };
  };

  const logout = async () => {
    setCurrentUser(null);
    setSelectedRole(null);

    return {
      success: true,
    };
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      selectedRole,
      currentRole: currentUser?.role || selectedRole,
      loading,
      isLoggedIn: !!currentUser,

      selectRole,
      setSelectedRole,
      login,
      register,
      logout,
      normalizeRole,
    }),
    [users, currentUser, selectedRole, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export default AuthContext;
