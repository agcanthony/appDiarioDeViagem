import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Mode = 'date' | 'time';

type DatePickerProps = {
  onChange?: (date: Date) => void;
  dataPadrao?: string | Date;
  habilitarAlteracao?: boolean;
};

export function DatePicker({ onChange, habilitarAlteracao = true, dataPadrao = null }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<Mode>('date');
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChange && onChange(currentDate);
  };

  const showMode = (currentMode: Mode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    if (!habilitarAlteracao) {
      return;
    }
    showMode('date');
  };

  useEffect(() => {
    if (dataPadrao) {
      setDate(new Date(dataPadrao));
    }
  }, [dataPadrao]);

  return (
    <View className="mb-5">
      <Text className="mb-2 text-base text-azul-600">Data</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showDatepicker}
        className="w-full rounded border border-azul-700 bg-azul-900 p-3 text-lg focus:border-azul-600">
        <Text className="py-1 text-base text-azul-100">{format(date, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      {show && <DateTimePicker value={date} mode={mode} is24Hour={true} onChange={handleChange} />}
    </View>
  );
}
