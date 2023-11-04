import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Actionsheet, Box } from 'native-base';
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

type DateSelectorContextType = {
  showBottomSheet: (value?: string) => void;
  closeBottomSheet: () => void;
  value: string;
};

const DateSelectorContext = createContext<DateSelectorContextType>({
  showBottomSheet: () => null,
  closeBottomSheet: () => null,
  value: new Date().toString(),
});

const DateSelectorProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>(new Date().toString());

  const showBottomSheet = (value?: string) => {
    Keyboard.dismiss();
    if (value) setValue(value);
    setVisible(true);
  };

  const closeBottomSheet = () => {
    setVisible(false);
  };

  const handleOnChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (date) setValue(date.toString());
      if (
        (Platform.OS === 'android' && event.type === 'set') ||
        event.type === 'neutralButtonPressed' ||
        event.type === 'dismissed'
      ) {
        closeBottomSheet();
      }
    },
    [closeBottomSheet],
  );

  const renderPlatformSpecificCalendar = () => {
    if (Platform.OS === 'ios') {
      return (
        <Actionsheet isOpen onClose={() => closeBottomSheet()}>
          <Actionsheet.Content>
            <Box w="100%" px={4} justifyContent="center">
              <Box>
                <RNDateTimePicker
                  onChange={handleOnChange}
                  value={new Date(value)}
                  mode="date"
                  display="spinner"
                  maximumDate={new Date()}
                />
              </Box>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      );
    } else {
      return (
        <Box w="100%" px={4} justifyContent="center">
          <Box>
            <RNDateTimePicker
              onChange={handleOnChange}
              value={new Date(value)}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <DateSelectorContext.Provider value={{ showBottomSheet, value, closeBottomSheet }}>
      <TouchableWithoutFeedback onPress={() => closeBottomSheet()}>
        {children}
      </TouchableWithoutFeedback>
      {
        visible && renderPlatformSpecificCalendar()
        // <Actionsheet isOpen onClose={() => closeBottomSheet()}>
        //   <Actionsheet.Content>
        //     <Box w="100%" px={4} justifyContent="center">
        //       <Box>
        //         <RNDateTimePicker
        //           onChange={handleOnChange}
        //           value={new Date(value)}
        //           mode="date"
        //           display="spinner"
        //           maximumDate={new Date()}
        //         />
        //       </Box>
        //     </Box>
        //   </Actionsheet.Content>
        // </Actionsheet>
      }
    </DateSelectorContext.Provider>
  );
};

export { DateSelectorProvider, DateSelectorContext };
