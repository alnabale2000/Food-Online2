import React from "react";

const HowToOrder = () => {
    return (
        <section className="hto-body">
            <h1 className="hto-top-text">Easy Way To Order</h1>

            <div className="how-to-order">
                <div className="wrapper">
                    <div className="how-to-order-card">
                        <h1>
                            <span className="enclosed">1#</span>Get A Meal
                        </h1>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="how-to-order-card">
                        <h1>
                            <span className="enclosed">2#</span>Order It
                        </h1>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="how-to-order-card">
                        <h1>
                            <span className="enclosed">3#</span>Eat It
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToOrder;
