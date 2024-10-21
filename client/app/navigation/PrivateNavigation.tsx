import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { TypeRootStackParamList } from "./navigation.type";
import { useAuth } from "@/hooks/useAuth";
import Auth from "@/components/screens/auth/Auth";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const PrivateNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      {user ? (
        routes.map((route) => <Stack.Screen key={route.name} {...route} />)
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default PrivateNavigator;
