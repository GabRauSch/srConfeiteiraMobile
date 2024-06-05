import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";
import { TouchableOpacity } from "react-native";

type Props = {
    active: boolean,
    onCheck: () => void
}

const RoundCheckBox = ({ active, onCheck }: Props) => {

    return (
        <TouchableOpacity style={{ padding: 5 }} onPress={() => { active; onCheck(); }} activeOpacity={1}>
            <Icon 
                name={active ? "check-circle" : "circle-o"}
                size={20}
                color={active ? COLORS.primary : COLORS.grayScaleSecondary}
            />
        </TouchableOpacity>
    )
}

export default RoundCheckBox
