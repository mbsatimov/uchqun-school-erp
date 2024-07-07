'use client';

import * as React from 'react';

import { TimePickerInput } from './time-picker-input';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
  picker?: 'HH:mm' | 'HH:mm:ss' | 'hour' | 'minute' | 'second';
}

export function TimePicker({
  date,
  setDate,
  picker = 'HH:mm',
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  const isHourPicker = picker === 'HH:mm' || picker === 'hour';
  const isMinutePicker =
    picker === 'HH:mm:ss' || picker === 'HH:mm' || picker === 'minute';
  const isSecondPicker = picker === 'HH:mm:ss' || picker === 'second';

  return (
    <div className="flex items-center gap-1">
      {isHourPicker && (
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      )}
      {isMinutePicker && (
        <>
          <span>:</span>
          <TimePickerInput
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
          />
        </>
      )}
      {isSecondPicker && (
        <>
          <span>:</span>
          <TimePickerInput
            picker="seconds"
            date={date}
            setDate={setDate}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
          />
        </>
      )}
    </div>
  );
}
