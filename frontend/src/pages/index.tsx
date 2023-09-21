// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Spinner Import
import Spinner from "../@core/components/spinner";

// ** Hook Imports
import { useAuth } from "../hooks/useAuth";

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === "client" || role === "admin")
    return "/dashboards/crm";
  else return "/404";
};

const Home = () => {
  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(auth.user);
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role);

      // Redirect user to Home URL
      router.replace(homeRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner sx={{ height: "100%" }} />;
};

export default Home;
