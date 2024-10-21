import { FC, PropsWithChildren } from "react";
import { View, Text } from "react-native";
import cn from "clsx";
import { ScrollView } from "react-native";

interface ILayout {
  className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
  return (
    <View className={cn("h-full w-full bg-white mt-16 px-4", className)}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  );
};

export default Layout;
