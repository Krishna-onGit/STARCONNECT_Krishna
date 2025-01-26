
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import News from "./components/News";


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
    path:"/News",
    element:<News />
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
