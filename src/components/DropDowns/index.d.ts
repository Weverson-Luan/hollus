export interface MultiSelectProps {
  items: Array;
  placeholder: string;
  returnSelected: (newValues) => Array;
}
