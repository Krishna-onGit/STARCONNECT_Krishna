
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Actor/Jobs";
import News from "./components/Actor/News";
import Profile from "./components/Actor/Profile";
import JobDescripion from "./components/Actor/JobDescripion";
import Browse from "./components/Actor/Browse";
import Companies from "./components/Director/Companies";
import CompanySetup from "./components/Director/CompanySetup";
import AdminJobs from "./components/Director/AdminJobs";
import PostJob from "./components/Director/PostJob";
import Applicants from "./components/Director/Applicants";
import CompaniesCreate from "./components/Director/CompaniesCreate";
import ProtectedRoute from './components/Director/ProtectedRoute.jsx';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/SignUp',
    element:<SignUp/>
  },
  {
    path:"/Jobs",
    element:<Jobs />
  },
  {
    path:"/description/:id",
    element:<JobDescripion />
  },
  {
    path:"/News",
    element:<News />
  },
  {
    path:"/Profile",
    element:<Profile />
  },
  {
    path:"browse",
    element:<Browse />
  },
  //for admin 
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompaniesCreate/></ProtectedRoute> 
  },
  {
    //actual path is 
     path: "/admin/companies/:id",
    //path: "/admin/companies/setup",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },

  //for admin to post Jobs
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  } ,
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    //path:"/admin/jobs/application",
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
])


function App() {
  return (
    <>
      <RouterProvider router = {appRouter} />
    </>
  );
}

export default App;
