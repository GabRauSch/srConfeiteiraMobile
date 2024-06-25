import { FontWeight } from "@shopify/react-native-skia"

export const COLORS = {
    primary: '#C7827D',
    primaryBlur: '#B7827D',
    primaryPressed: '#A7827D',
    secondary: '#ECCEC3',
    grayScalePrimary: '#d9d9d9',
    grayScaleSecondary: '#929292',
    textColor: '#512115',
    unactive: '#888',
}
export const SHADOW = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, 
    shadowRadius: 4,
    elevation: 3, 
}
export const MODAL = {
    position: 'relative',
    height: '100%',
    zIndex: 999
}


type label = {
    color: string,
    fontSize: number,
    fontWeight: 'bold'
}
export const LABEL: label = {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold'
}

export const SUBSCRIPTIONCOLORS: any = {
    simples: 'white',
    prata: '#999',
    gold: '#fee1aa',
    srconfeiteira: '#FFD700'
}