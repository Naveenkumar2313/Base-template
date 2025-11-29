import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./views/sessions/LoginPage";

import ParcLayout from "./components/ParcLayout/ParcLayout";
import DefaultDashboard from "./views/dashboard/DefaultDashboard";

// --- FACULTY COMPONENTS ---
const FacultyDashboard = lazy(() => import("./views/marks-management/faculty/FacultyDashboard"));
const ArticulationMatrixPage = lazy(() => import("./views/marks-management/faculty/ArticulationMatrixPage"));
const MarksEntryPage = lazy(() => import("./views/marks-management/faculty/MarksEntryPage"));
const IndirectCoAttainmentPage = lazy(() => import("./views/marks-management/faculty/IndirectCoAttainmentPage"));
const CoPoAttainmentPage = lazy(() => import("./views/marks-management/faculty/CoPoAttainmentPage"));
const AttainmentReportPage = lazy(() => import("./views/marks-management/faculty/AttainmentReportPage"));

// --- ADMIN COMPONENTS ---
const AdminDashboard = lazy(() => import("./views/marks-management/Admin/AdminDashboard"));
const FacultyManagement = lazy(() => import("./views/marks-management/Admin/FacultyManagement"));
const CourseManagement = lazy(() => import("./views/marks-management/Admin/CourseManagement"));
const CourseAssignment = lazy(() => import("./views/marks-management/Admin/CourseAssignment")); // You need to create this file too
const OutcomesManagement = lazy(() => import("./views/marks-management/Admin/OutcomesManagement"));
const ConsolidatedMatrixPage = lazy(() => import("./views/marks-management/Admin/ConsolidatedMatrixPage"));
const ProgramLevelMatrixPage = lazy(() => import("./views/marks-management/Admin/ProgramLevelMatrixPage"));
const EvaluationResultPage = lazy(() => import("./views/marks-management/Admin/EvaluationResultPage"));
const IndirectAttainmentPage = lazy(() => import("./views/marks-management/Admin/IndirectAttainmentPage"));

// --- SUPER ADMIN COMPONENTS ---
const SuperAdminDashboard = lazy(() => import("./views/marks-management/superadmin/SuperAdminDashboard"));
const DepartmentAttainment = lazy(() => import("./views/marks-management/superadmin/DepartmentAttainment"));

const routes = [
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "/session/signin", element: <LoginPage /> },
  {
    element: <ParcLayout />,
    children: [
      { path: "/dashboard/default", element: <DefaultDashboard /> },

      // --- FACULTY ROUTES ---
      { path: "/faculty/dashboard", element: <FacultyDashboard /> },
      { path: "/faculty/articulation", element: <ArticulationMatrixPage /> },
      { path: "/faculty/marks", element: <MarksEntryPage /> },
      { path: "/faculty/indirect-co", element: <IndirectCoAttainmentPage /> },
      { path: "/faculty/copo-attainment", element: <CoPoAttainmentPage /> },
      { path: "/faculty/reports", element: <AttainmentReportPage /> },

      // --- ADMIN ROUTES ---
      { path: "/admin/dashboard", element: <AdminDashboard /> },
        { path: "/admin/faculty", element: <FacultyManagement /> },
        { path: "/admin/courses", element: <CourseManagement /> },
        { path: "/admin/assign-courses", element: <CourseAssignment /> },
        { path: "/admin/outcomes", element: <OutcomesManagement /> },
        { path: "/admin/consolidation", element: <ConsolidatedMatrixPage /> },
        { path: "/admin/program-matrix", element: <ProgramLevelMatrixPage /> },
        { path: "/admin/evaluation-result", element: <EvaluationResultPage /> },
        { path: "/admin/indirect-attainment", element: <IndirectAttainmentPage /> },
      // Add other admin routes defined in navigations.js

      // --- SUPER ADMIN ROUTES ---
      { path: "/superadmin/dashboard", element: <SuperAdminDashboard /> },
      { path: "/superadmin/departments", element: <DepartmentAttainment /> }
      // Add other super admin routes defined in navigations.js
    ]
  },

  // Fallback for unknown routes
  { path: "*", element: <Navigate to="/session/signin" /> }

];

export default routes;
