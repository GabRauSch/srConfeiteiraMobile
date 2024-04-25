import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    active: number
}

const RoundCheckBox = ({active}: Props)=>{
    const [isChecked, setIsChecket] = useState(Boolean(active));

    return (
        <TouchableOpacity style={{ padding: 5}} onPress={()=>{setIsChecket(!isChecked)}} activeOpacity={1}>
            <Icon 
                name={isChecked ? "check-circle" : "circle-o"}
                size={20}
                color={isChecked ? COLORS.primary : COLORS.grayScaleSecondary}
            />
        </TouchableOpacity>
    )
}

export default RoundCheckBox