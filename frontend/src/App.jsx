import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootLayout from "./layouts/RootLayout";
import { Home, Error, Login, VerifyEmail, ResetPassword, Todes } from "./pages";
import RequiredAuth from "./controllers/RequiredAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="verifyemail" element={<VerifyEmail />} />
      <Route path="ResetPassword" element={<ResetPassword />} />
      <Route
        path="todos"
        element={
          <RequiredAuth>
            <Todes />
          </RequiredAuth>
        }
      />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} position="bottom-right" />
    </div>
  );
}

export default App;
