import React, { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DropDownContainer, DropDownStyle } from "../style";
import { ActivityIndication } from "../../Spinner";
import theme from "../../../styles/colors/theme";
import { MultiSelectProps } from "..";

const MultiSelectDropdown = ({
  items,
  placeholder = "Selecione pelo menos um item",
  returnSelected,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const modifiedItems = useMemo(() => {
    return items?.map((i) => ({ label: i.nome, value: i.id }));
  }, [items]);

  const onChangeSelected = (selected) => {
    if (selected.length === 0) {
      return;
    }
    returnSelected(
      selected.map((s) => {
        let fi = items.find((i) => i.id === s);
        return {
          nome: fi.nome,
          id: fi.id,
          beginTime: new Date(),
          endTime: new Date(),
          changedBeginTime: false,
          changedEndTime: false,
          days: Array(7).fill(false),
        };
      })
    );
    return;
  };

  return (
    <DropDownContainer>
      <DropDownPicker
        loading={items.length === 0}
        ListEmptyComponent={() => <ActivityIndication />}
        open={open}
        setOpen={setOpen}
        items={modifiedItems}
        value={selectedItems}
        setValue={setSelectedItems}
        onChangeValue={onChangeSelected}
        placeholder={placeholder}
        multiple={true}
        multipleText={`${selectedItems.length} selecionado(s)`}
        min={1}
        // searchable={true}
        mode="BADGE"
        showBadgeDot={false}
        badgeProps={{ disabled: true }}
        // badgeDotColors={[theme.colors.white]}
        badgeColors={[theme.colors.orange_login]}
        badgeTextStyle={DropDownStyle.badgeText}
        closeOnBackPressed={true}
        listMode="FLATLIST"
        style={DropDownStyle.component}
        containerStyle={DropDownStyle.container}
        dropDownContainerStyle={DropDownStyle.dropdownContainer}
      />
    </DropDownContainer>
  );
};

export default MultiSelectDropdown;
