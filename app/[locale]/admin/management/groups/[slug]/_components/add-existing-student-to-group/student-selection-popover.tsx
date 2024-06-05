import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { StudentSelectionCommandMenu } from './student-selection-command-menu';

interface StudentSelectionPopoverProps {
  selectedStudents: Array<IStudentPreview>;
  setSelectedStudents: React.Dispatch<
    React.SetStateAction<Array<IStudentPreview>>
  >;
  groupId: number;
}

export const StudentSelectionPopover: React.FC<
  StudentSelectionPopoverProps
> = ({
  selectedStudents: selectedValues,
  setSelectedStudents: setSelectedValues,
  groupId,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = React.useState(false);

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  return (
    <div className="max-w-full">
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-full justify-between text-foreground"
          >
            <div className="truncate">
              {selectedValues.length === 0 && 'Select students'}
              {selectedValues.length === 1 &&
                `${selectedValues[0].name} ${selectedValues[0].surname}`}
              {selectedValues.length === 2 &&
                `${selectedValues[0].name} ${selectedValues[0].surname}, ${selectedValues[1].name} ${selectedValues[1].surname}`}
              {selectedValues.length === 3 &&
                selectedValues.map(({ name }) => name).join(', ')}
              {selectedValues.length > 3 &&
                `${selectedValues.length} students selected`}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 sm:w-[400px]">
          <StudentSelectionCommandMenu
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            inputRef={inputRef}
            groupId={groupId}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
