export const goStudentTab = (navigation, screen, params = {}) => {
  navigation.navigate("StudentNavigatorTabs", {
    screen,
    params,
  });
};

export const goTeacherTab = (navigation, screen, params = {}) => {
  navigation.navigate("TeacherNavigatorTabs", {
    screen,
    params,
  });
};

export const goParentTab = (navigation, screen, params = {}) => {
  navigation.navigate("ParentNavigatorTabs", {
    screen,
    params,
  });
};

export const goAdminTab = (navigation, screen, params = {}) => {
  navigation.navigate("AdminNavigatorTabs", {
    screen,
    params,
  });
};

export const resetToLogin = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Auth" }],
  });
};
