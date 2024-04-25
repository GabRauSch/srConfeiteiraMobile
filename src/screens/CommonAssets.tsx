import React, { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import SearchInput from "../components/SearchInput";
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
};

const CommonAssets = ({ children }: Props) => {
  const status = ["Abertos", "Entregues", "Recebidos"];
  const options = ["Todas", ...status, "mais"];
  const [selectedStatus, setSelectedCategory] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState(0);
  const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);

  const navigate = useNavigation();
  const handleStatusSelect = (option: string, key: number) => {
    setSelectedCategory(option === "Todas" ? null : option);
    setActiveKey(key);
  };

  return (
    <View style={styles.page}>
      <SearchInput />
      <View style={styles.options}>
        {options.map((option, key) => (
          <OptionItem
            key={key}
            option={option}
            handleActive={() => {
              handleStatusSelect(option, key);
            }}
            active={activeKey == key}
          />
        ))}
      </View>
      <HorizontalLine />

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
            setCreateOptionsDisplay(!createOptionsDisplay);
          }}
        ></AddButton>
      </View>
    </View>
  );
};

export default CommonAssets;
