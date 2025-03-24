import { Outlet } from "react-router-dom";
import NavBar from "../controllers/NavBar";

function RootLayout() {
  return (
    <>
      <header className="container m-auto">
        <NavBar />
      </header>
      <main className="container m-auto">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
