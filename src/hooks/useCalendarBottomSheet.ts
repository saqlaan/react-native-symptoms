import { DateSelectorContext } from '../context/DateSelectorContext/DateSelectorContext';
import { useContext } from 'react';

function useCalendarBottomSheet() {
  const { showBottomSheet, closeBottomSheet, value } = useContext(DateSelectorContext);

  return {
    showBottomSheet,
    closeBottomSheet,
    value,
  };
}

export default useCalendarBottomSheet;
