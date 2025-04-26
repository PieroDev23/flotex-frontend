import { Grid } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import ShopProvider from "../context/ShopContext";



export const WebLayout: React.FC = () => {
  const location = useLocation();
  React.useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return (
    <ShopProvider>
      <Grid templateRows="auto 1fr auto" minH="100dvh">
        <Header />
        <Outlet />
        <Footer />
      </Grid>
    </ShopProvider>
  )
}