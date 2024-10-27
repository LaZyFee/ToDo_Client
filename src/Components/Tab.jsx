import { NavLink } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { RiAuctionLine } from "react-icons/ri";
import { GrCompliance } from "react-icons/gr";

function Tab() {
  const menuItems = [
    { name: "My ToDos", icon: <LuListTodo />, path: "/" },
    { name: "Active ToDos", icon: <RiAuctionLine />, path: "/active" },
    { name: "Completed ToDos", icon: <GrCompliance />, path: "/complete" },
  ];

  return (
    <div
      role="tablist"
      className="tabs tabs-bordered w-1/2 text-center mx-auto"
    >
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          end={item.path === "."} // Ensure exact matching for the root route
          role="tab"
        >
          <span className="inline-flex items-center">
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default Tab;
