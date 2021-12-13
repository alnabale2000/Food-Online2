import React from "react";
import SideNavigation from "./side_navigation";
import UserData from "./user_data";
import UserOrders from "./user_orders";
import UserAddress from "./user_address";

const UserProfile = () => {
    return (
        <main className="admin-body">
            <section>
                <SideNavigation />
            </section>
            <section className="handle-restaurant">
                <UserData />
                <UserOrders />
                <UserAddress />
            </section>
        </main>
    );
};

export default UserProfile;
