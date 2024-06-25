import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/component.InputEdit';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { handleSetNumericValue } from '../util/numeric';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  main?: boolean;
  lockEdit?: boolean;
  beforeHolder?: string;
};

const InputNumber = ({ label, value, main, lockEdit, onChange, beforeHolder }: Props) => {
  const formattedValue = useMemo(() => handleSetNumericValue(value), [value, handleSetNumericValue]);

  const handleChange = useCallback((newValue: string) => {
    onChange(handleSetNumericValue(newValue));
  }, [onChange, handleSetNumericValue]);

  return (
    <TouchableOpacity style={main ? styles.productName : styles.productInfoItem} activeOpacity={1} onPress={() => {}}>
      {!main && (
        <Text style={[styles.productInfoText, lockEdit ? styles.notEditable : null]}>{label}</Text>
      )}
      <View style={{ ...styles.inputArea, justifyContent: beforeHolder ? 'flex-start' : 'center' }}>
        {beforeHolder && <Text style={styles.beforeHolder}>{beforeHolder}</Text>}
        <TextInput
          editable={!lockEdit}
          style={[styles.productInput, main ? styles.name : null, lockEdit ? styles.notEditable : null]}
          value={formattedValue}
          keyboardType="decimal-pad"
          onChangeText={handleChange}
        />
      </View>
    </TouchableOpacity>
  );
};

export default InputNumber;
