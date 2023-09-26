/**
 * IMPORTS
 */
import React from "react";


interface IAddCategoryTimeModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  openBeginTimePicker: boolean;

  AddCategoryCleanState: () => void;

  beginTime: Date;
  onTimeChangeBegin: (_event: any, selectedTime: Date | any) => void;
  isLoading: boolean;
  selectedBeginTime: boolean;

  openEndTimePicker: boolean;
  endTime: Date;
  onTimeChangeEnd: (_event: any, selectedTime: Date | any) => void;

  setOpenBeginTimePicker: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEndTimePicker: React.Dispatch<React.SetStateAction<boolean>>;

  selectedEndTime: any;
  selectDay: (value: any) => void;
  days: string[];
  selectedDays: string[];

  checkDaySelected: (value: any) => any;

  terapeuta_categoria_id: number;
}

/**
 * EXPORTS
 */
export {
  IAddCategoryTimeModalProps
}