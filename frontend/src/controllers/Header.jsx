import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const { auth, user } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <p className="text-2xl text-gray-900">
        Hello{" "}
        {auth && auth?.user?.username ? `${auth.user.username}` : "Developer"}{" "}
        👋
      </p>

      <p className="text-6xl font-bold  text-gray-700">
        Welcome to our Aplication
      </p>
      <Link
        to="/login"
        className="flex border px-6 py-2 rounded-xl hover:bg-gray-200 gap-2 transition-all"
      >
        Get Started
        <img src={assets.arrowRight} alt="arrowRight" />
      </Link>
    </div>
  );
}

export default Header;
