import { View } from "react-native";
import { TypeNavigate } from "./menu.interface";
import { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { menuItems } from "./menu.data";
import MenuItem from "./MenuItem";

interface IBottomMenuProps {
  nav: TypeNavigate;
  currentRoute?: string;
}

const BottomMenu: FC<IBottomMenuProps> = (props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="pt-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#bbbbbb] bg-white"
      style={{
        paddingBottom: bottom + 20,
      }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.path} item={item} {...props} />
      ))}
    </View>
  );
};

export default BottomMenu;
