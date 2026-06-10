export const isEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validateLogin = ({ email, password }) => {
  if (!email) return "Email is required";
  if (!isEmail(email)) return "Enter a valid email";
  if (!password) return "Password is required";
  return "";
};

export const validateRequired = (value, label = "Field") => {
  if (!value || String(value).trim() === "") return label + " is required";
  return "";
};
