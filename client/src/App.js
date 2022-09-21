import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Dashboard from './Components/User/Dashboard'
import Private from './Routes/Private'
import Borrow from './Components/User/Borrow'
import Archive from './Components/User/Archive'
import Issued from './Components/User/Issued'
import UpdatePassword from './Components/User/UpdatePassword'
import ViewUser from './Components/SuperAdmin/ManageUsers/ViewUser'
import DashboardSA from './Components/SuperAdmin/Dashboard'
import AddUser from './Components/SuperAdmin/ManageUsers/AddUser'
import ChangePassword from './Components/SuperAdmin/MyProfile/ChangePassword'
import UpdateDetails from './Components/SuperAdmin/MyProfile/UpdateDetails'
import IssueBook from './Components/SuperAdmin/IssueBook'
import ViewIssued from './Components/SuperAdmin/ViewIssued'
import AddBook from './Components/SuperAdmin/ManageBooks/AddBook'
import ViewBooks from './Components/SuperAdmin/ManageBooks/ViewBooks'
import Verify from './Components/Verify'
import DashboardA from './Components/Admin/Dashboard'
import ChangePass from './Components/Admin/MyProfile/ChangePass'
import Update from './Components/Admin/MyProfile/Update'
import ViewAllUsers from './Components/Admin/ManageUsers/ViewAllUsers'
import AddNewUser from './Components/Admin/ManageUsers/AddNewUser'
import AddNewBook from './Components/Admin/ManageBooks/AddNewBook'
import ViewAdminBooks from './Components/Admin/ManageBooks/ViewAdminBooks'
import PendingRequests from './Components/Admin/PendingRequests'
import ApprovedRequests from './Components/Admin/ApprovedRequests'
import DeleteRequests from './Components/SuperAdmin/ManageBooks/DeleteRequests'

const App = () => {
  const ROLES = {
    'User': 0,
    'Admin': 1,
    'Super_Admin': 2
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<Verify />} />
          <Route element={<Private allowedRoles={ROLES.User} />}>
            <Route path={`/${ROLES.User}/dashboard`} element={<Dashboard />} />
            <Route path={`/${ROLES.User}/password`} element={<UpdatePassword />} />
            <Route path={`/${ROLES.User}/issued`} element={<Issued />} />
            <Route path={`/${ROLES.User}/archive`} element={<Archive />} />
            <Route path={`/${ROLES.User}/borrow`} element={<Borrow />} />
          </Route>
          <Route element={<Private allowedRoles={ROLES.Admin} />}>
            <Route path={`/${ROLES.Admin}/dashboard`} element={<DashboardA />} />
            <Route path={`/${ROLES.Admin}/password`} element={<ChangePass />} />
            <Route path={`/${ROLES.Admin}/update`} element={<Update />} />
            <Route path={`/${ROLES.Admin}/view/users`} element={<ViewAllUsers />} />
            <Route path={`/${ROLES.Admin}/add/user`} element={<AddNewUser />} />
            <Route path={`/${ROLES.Admin}/add/book`} element={<AddNewBook />} />
            <Route path={`/${ROLES.Admin}/view/books`} element={<ViewAdminBooks />} />
            <Route path={`/${ROLES.Admin}/issue/book`} element={<PendingRequests />} />
            <Route path={`/${ROLES.Admin}/view/issued`} element={<ApprovedRequests />} />
          </Route>

          <Route element={<Private allowedRoles={ROLES.Super_Admin} />}>
            <Route path={`/${ROLES.Super_Admin}/dashboard`} element={<DashboardSA />} />
            <Route path={`/${ROLES.Super_Admin}/password`} element={<ChangePassword />} />
            <Route path={`/${ROLES.Super_Admin}/update`} element={<UpdateDetails />} />
            <Route path={`/${ROLES.Super_Admin}/add/book`} element={<AddBook />} />
            <Route path={`/${ROLES.Super_Admin}/view/books`} element={<ViewBooks />} />
            <Route path={`/${ROLES.Super_Admin}/delete/books`} element={<DeleteRequests />} />
            <Route path={`/${ROLES.Super_Admin}/issue/book`} element={<IssueBook />} />
            <Route path={`/${ROLES.Super_Admin}/add/user`} element={<AddUser />} />
            <Route path={`/${ROLES.Super_Admin}/view/users`} element={<ViewUser />} />
            <Route path={`/${ROLES.Super_Admin}/view/issued`} element={<ViewIssued />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App