import Toast from "@/components/ui/Toast";
import Navigation from "@/navigation/Navigation";
import AuthProvider from "@/providers/auth/AuthProvider";
import { persistor, store } from "@/store/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AuthProvider>
            <SafeAreaProvider>
              <StripeProvider publishableKey={process.env.STRIPE_KEY as string}>
                <Navigation />
              </StripeProvider>
            </SafeAreaProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
      <Toast />
    </QueryClientProvider>
  );
}