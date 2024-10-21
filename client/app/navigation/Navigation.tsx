import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import PrivateNavigator from "./PrivateNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import BottomMenu from "@/components/ui/layout/buttom-menu/BottomMenu";
import { useCheckAuth } from "@/providers/auth/authCheckAuth";

const Navigation = () => {
  const { user } = useAuth();

  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined
  );

  const navRef = useNavigationContainerRef();

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name);

    const listener = navRef.addListener("state", () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name)
    );

    return () => {
      navRef.removeListener("state", listener);
    };
  }, []);

  useCheckAuth(currentRoute);

  return (
    <>
      <NavigationContainer ref={navRef}>
        <PrivateNavigator />
      </NavigationContainer>
      {user && currentRoute && (
        <BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
      )}
    </>
  );
};

export default Navigation;
