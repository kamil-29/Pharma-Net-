import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.LoginData);
  console.log(user);
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="g_border_radius p-3 bg-white">
      <div>
        <input type="text" className="input_global w-100" placeholder="Search menu" />
      </div>
      {user?.user_type === "admin" ? (
        <>
          <div className="sidebar_sec mt-2">
            <NavLink to="/allCustomers">
              <div className="sidebar_items mt-3">
                <i className="fa-solid fa-user"></i> All Customers
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/allVendors">
              <div className="sidebar_items mt-3">
                <i className="fa-solid fa-user"></i> All Vendors
              </div>
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar_sec mt-2">
            <NavLink to="/dashboard">
              <div className="sidebar_items mt-3">
                <i className="fa-solid fa-gauge"></i> Dashboard
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/orders">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-cart-shopping"></i> Orders
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/medicine">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-send-back"></i> Medicines
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/category">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-network-wired"></i> Categories
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/categorylist">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-network-wired"></i> Categories List
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/customers">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-network-wired"></i>
                Customerscode
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/vendors">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-network-wired"></i>
                Vendors
              </div>
            </NavLink>
          </div>
          <div className="sidebar_sec mt-2">
            <NavLink to="/vendors/medicine">
              <div className="sidebar_items  mt-3">
                <i className="fa-solid fa-book"></i>
                Vendors Medicine
              </div>
            </NavLink>
          </div>
        </>
      )}

      <div className="sidebar_sec mt-2"></div>
      <div className="sidebar_sec mt-2">
        <button>
          <div className="sidebar_items  mt-3" onClick={() => logout()}>
            <i className="fa-solid fa-user"></i>
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
