import { FC, PropsWithChildren } from "react";
import { Text, Pressable } from "react-native";
import { IButton } from "./button-interface";
import cn from "clsx";

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Pressable
      className={cn(
        "self-center mt-3.5 bg-main w-full py-3 font-light",
        className
      )}
      {...rest}
    >
      <Text className="text-white text-center font-medium text-lg">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
