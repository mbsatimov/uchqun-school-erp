import { Input } from '@/components/ui';

export function TableToolbar() {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter users..."
          // value={inputValue}
          // onChange={event => setInputValue(event.target.value)}
          className="h-8 w-auto flex-1 sm:w-[220px]"
        />
      </div>
    </div>
  );
}
