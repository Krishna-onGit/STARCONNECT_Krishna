import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load pages
const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Home = lazy(() => import("./components/Home"));
const Jobs = lazy(() => import("./components/Actor/Jobs"));
const News = lazy(() => import("./components/Actor/News"));
const Profile = lazy(() => import("./components/Actor/Profile"));
const JobDescription = lazy(() => import("./components/Actor/JobDescripion"));
const Browse = lazy(() => import("./components/Actor/Browse"));
const Companies = lazy(() => import("./components/Director/Companies"));
const CompanySetup = lazy(() => import("./components/Director/CompanySetup"));
const AdminJobs = lazy(() => import("./components/Director/AdminJobs"));
const PostJob = lazy(() => import("./components/Director/PostJob"));
const Applicants = lazy(() => import("./components/Director/Applicants"));
const CompaniesCreate = lazy(() =>
  import("./components/Director/CompaniesCreate")
);
const ProtectedRoute = lazy(() =>
  import("./components/Director/ProtectedRoute")
);
const CDhome = lazy(() => import("./components/CDhome"));
const CDprofile = lazy(() => import("./components/Director/CDprofile"));
const PersonalProfile = lazy(() =>
  import("./components/Actor/PersonalProfile")
);
const FindTalent =lazy(()=> import("./components/Director/FindTalent"));
const FindDirector =lazy(()=> import("./components/Actor/FindDirector"));
const CDPersonalProfile =lazy(()=> import("./components/Director/CDPersonalProfile"));


const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/news", element: <News /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile/", element: <Profile /> },
  { path: "/FindDirector",element:<FindDirector />},
  { path: "/Director/profile/:id",element:<CDPersonalProfile />},
  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <CDhome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/actor/profile/:id",
    element: (
      // <ProtectedRoute>
        <PersonalProfile />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompaniesCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/CDprofile/:id",
    element: (
      <ProtectedRoute>
        <CDprofile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/FindTalent",
    element: (
      <ProtectedRoute>
        <FindTalent />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
