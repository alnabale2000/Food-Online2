import React from "react";
import ResSideNavigation from "./side_nav";
import AddCategorySection from "./add_category";
import AddMealSection from "./add_meal";
import DeleteSection from "./delete_section";

const ResCategoriesAndMeals = () => {
    return (
        <main className="admin-body">
            <section>
                <ResSideNavigation />
            </section>
            <section className="handle-restaurant">
                <AddCategorySection />
                <AddMealSection />
                <DeleteSection />
            </section>
        </main>
    );
};

export default ResCategoriesAndMeals;
