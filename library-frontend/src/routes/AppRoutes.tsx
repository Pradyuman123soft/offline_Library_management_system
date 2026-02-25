import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

// Member Pages
import MembersList from "../modules/members/pages/MembersList";
import AddMember from "../modules/members/pages/AddMember";
import EditMember from "../modules/members/pages/EditMember";
import MemberDetails from "../modules/members/pages/MemberDetails";

// Transaction Pages
import TransactionsList from "../modules/transactions/pages/TransactionsList";
import IssueBook from "../modules/transactions/pages/IssueBook";
import ReturnBook from "../modules/transactions/pages/ReturnBook";
import RenewBook from "../modules/transactions/pages/RenewBook";
import Reservations from "../modules/transactions/pages/Reservations";

// Auth Page
import Login from "../modules/auth/pages/Login";
import AdminRoute from "./AdminRoute";
import StaffManagement from "../modules/staff/pages/StaffManagement";
import ReportsDashboard from "../modules/reports/pages/ReportsDashboard";
import BookManagement from "../modules/books/components/BookManagement";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>

          {/* Dashboard */}
          <Route index element={<div>Dashboard Page</div>} />

          {/* Members */}
          <Route path="members" element={<MembersList />} />
          <Route path="members/add" element={<AddMember />} />
          <Route path="members/edit/:id" element={<EditMember />} />
          <Route path="members/:id" element={<MemberDetails />} />

          {/* BOOKS */}
          <Route path="books" element={<BookManagement/>}/>

          {/* Transactions */}
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="transactions/issue" element={<IssueBook />} />
          <Route path="transactions/return" element={<ReturnBook />} />
          <Route path="transactions/renew" element={<RenewBook />} />
          <Route path="transactions/reservations" element={<Reservations />} />
          {/* ✅ NEW — Reports Route */}
          <Route path="reports" element={<ReportsDashboard />} />
        </Route>
      </Route>
      <Route
        path="/staff-management"
        element={
          <AdminRoute>
            <StaffManagement />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;