export const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
};

export const getStatusColor = (status) => {
  const s = String(status || "").toUpperCase();

  if (["COMPLETED", "REVIEWED", "APPROVED", "VERIFIED", "PRESENT", "ANSWERED", "SOLVED"].includes(s)) {
    return "#22C55E";
  }

  if (["PENDING", "REQUESTED", "SUBMITTED", "UPCOMING", "NEW"].includes(s)) {
    return "#F59E0B";
  }

  if (["REJECTED", "LATE", "ABSENT", "OVERDUE", "DISCIPLINE"].includes(s)) {
    return "#EF4444";
  }

  return "#2563EB";
};

export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
