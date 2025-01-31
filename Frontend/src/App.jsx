
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import News from "./components/News";
import Profile from "./components/Profile";
import JobDescripion from "./components/JobDescripion";
import Browse from "./components/Browse";

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
  }
 
])


function App() {
  return (
    <>
      <RouterProvider router = {appRouter} />
    </>
  );
}

export default App;
