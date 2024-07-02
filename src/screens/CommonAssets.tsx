import React, { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import { CreateOptions } from "../modals/CreateOptions";
import { styles } from "../styles/screen.CommonAssets";
import AddButton from "../components/AddButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";

type Props = {
  children: ReactNode;
  createUrl: string
};

const CommonAssets = ({ children, createUrl }: Props) => {
  const status = ["Abertos", "Entregues", "Recebidos"];
  const options = ["Todas", ...status, "mais"];
  const [selectedStatus, setSelectedCategory] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState(0);
  const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);

  const navigation = useNavigation() as any;
  const handleStatusSelect = (option: string, key: number) => {
    setSelectedCategory(option === "Todas" ? null : option);
    setActiveKey(key);
  };

  return (
    <View style={styles.page}>
      {children}

      <View style={styles.addButonArea}>
        {createOptionsDisplay && (
          <CreateOptions
            onClose={() => {
              setCreateOptionsDisplay(false);
            }}
          />
        )}
        <AddButton
          onClick={() => {
            navigation.navigate(createUrl)
          }}
        ></AddButton>
      </View>
    </View>
  );
};

export default CommonAssets;
