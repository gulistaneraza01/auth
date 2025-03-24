import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthProvider";

function NavBar() {
  const { auth, logout, sendOtp } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  async function handleVerifyEmail() {
    sendOtp();
    navigate("/verifyemail");
  }

  return (
    <nav className="flex justify-between items-center pt-4">
      <h2>
        <Link to="/" className="flex items-center gap-1 text-green-700">
          <img src={assets.logo} alt="logo" className="h-8" />
          Raza
        </Link>
      </h2>
      <ul className="flex gap-5">
        <NavLink to="/">Home</NavLink>
        {/* {auth && !auth.user?.isAccountVerify && (
          <NavLink to="/verifyemail">VerifyEmail</NavLink>
        )} */}
        <NavLink to="/todos">Todos</NavLink>
      </ul>
      <div>
        {auth && auth.user?.isAccountVerify === false && (
          <button
            onClick={handleVerifyEmail}
            className=" mr-4 border px-4 py-1.5 rounded-md hover:bg-gray-200 transition-all cursor-pointer"
          >
            verify email
            <img
              src={assets.arrowRight}
              alt="arrowRight"
              className="inline-block "
            />
          </button>
        )}
        {auth && auth.isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="border px-4 py-1.5 rounded-md hover:bg-gray-200 transition-all cursor-pointer"
          >
            Logout
            <img
              src={assets.arrowRight}
              alt="arrowRight"
              className="inline-block "
            />
          </button>
        ) : (
          <Link to="/login">
            <button className="border px-4 py-1.5 rounded-md hover:bg-gray-200 transition-all cursor-pointer">
              Login
              <img
                src={assets.arrowRight}
                alt="arrowRight"
                className="inline-block "
              />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
