import React from "react";
import { Route } from "react-router-dom";

const RouteWithlayout = ({ layout: Layout, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <Layout>
          <Component />
        </Layout>
      }
    />
  );
};

export default RouteWithlayout;
