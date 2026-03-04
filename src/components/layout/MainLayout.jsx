import Navbar from "./Navbar";
import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";


const MainLayout = ({ children }) => {

    return (


        <div>
            <div className="d-flex justify-content-end">
                <NotificationBell />
            </div>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="p-4 w-100">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default MainLayout;
