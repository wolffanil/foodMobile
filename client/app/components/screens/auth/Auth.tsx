import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/Loader";
import { IAuthFormData } from "@/types/auth.interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import AuthFields from "./AuthFields";
import { useAuthMutations } from "./useAuthMutations";

const Auth = () => {
  const [isReg, setIsReg] = useState(false);

  const { handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: "onChange",
  });

  const { isLoading, registerSync, loginSync } = useAuthMutations(reset);

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
    if (isReg) registerSync(data);
    else loginSync(data);
  };

  return (
    <View className="mx-2 items-center justify-center h-full">
      <View className="w-9/12">
        <Text className="text-center text-black text-3xl font-medium mb-8">
          {isReg ? "Sign Up" : "Login"}
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AuthFields control={control} />

            <Button onPress={handleSubmit(onSubmit)}>
              {isReg ? "Sign up" : "Login"}
            </Button>

            <Pressable onPress={() => setIsReg(!isReg)} disabled={isLoading}>
              <Text className="text-black text-center text-base mt-6">
                {isReg
                  ? "Already have an account ?"
                  : "Don't have an account ?"}
                <Text className="text-main">{isReg ? "Login" : "Sign up"}</Text>
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default Auth;
