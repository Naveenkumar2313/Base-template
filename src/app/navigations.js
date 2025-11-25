export const navigations = [
  { name: "Page 1", path: "/dashboard/default", icon: "dashboard" },
  { label: "PAGES", type: "label" },
  {
    name: "Page 2",
    icon: "trending_up",
    children: [
      { name: "Dummy Page 1", path: "/dummy1", iconText: "D1" },
      { name: "Dummy Page 2", path: "/dummy2", iconText: "D2" }
    ]
  }
];

export const facultyNavigations = [
  { label: "Faculty", type: "label" },
  { name: "Dashboard", path: "/faculty/dashboard", icon: "dashboard" },
  { name: "Articulation Matrix", path: "/faculty/articulation", icon: "table_view" }, // Map Lucide icons to MUI string names or keep generic
  { name: "Marks Entry", path: "/faculty/marks", icon: "edit" },
  { name: "Indirect CO", path: "/faculty/indirect-co", icon: "description" },
  { name: "CO-PO Attainment", path: "/faculty/copo-attainment", icon: "track_changes" },
  { name: "Reports", path: "/faculty/reports", icon: "assessment" },
];

export const adminNavigations = [
  { label: "Admin", type: "label" },
  { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
  { name: "Manage Faculty", path: "/admin/faculty", icon: "people" },
  { name: "Manage Courses", path: "/admin/courses", icon: "book" },
  { name: "Manage Outcomes", path: "/admin/outcomes", icon: "assignment" },
  { name: "Consolidated Matrix", path: "/admin/matrix", icon: "grid_on" },
];

export const superAdminNavigations = [
  { label: "Super Admin", type: "label" },
  { name: "Dashboard", path: "/superadmin/dashboard", icon: "dashboard" },
  { name: "Departments", path: "/superadmin/departments", icon: "business" },
  { name: "Admins", path: "/superadmin/admins", icon: "supervisor_account" },
];