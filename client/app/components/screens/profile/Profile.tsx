import { View, Image } from "react-native";
import { useProfile } from "./useProfile";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/ui/layout/Layout";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/button/Button";
import { AuthService } from "@/services/auth/auth.service";

const Profile = () => {
  const { setUser } = useAuth();

  const { profile } = useProfile();

  return (
    <Layout>
      <Heading isCenter>Profile</Heading>

      <View className="my-6 items-center justify-center">
        <Image
          source={{ uri: profile?.avatarPath }}
          className="w-40 h-40 rounded-full"
        />
      </View>

      <Button
        className="mt-5"
        onPress={() => AuthService.logout().then(() => setUser(null))}
      >
        Logout
      </Button>
    </Layout>
  );
};

export default Profile;
