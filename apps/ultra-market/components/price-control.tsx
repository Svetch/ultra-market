'use client';

import { cn } from '@ultra-market/ui-utils';
import { Slider } from '@ultra-market/ui/slider';
import { useState } from 'react';

export function PriceControl({
  name,
  defaultValue,
  max,
}: {
  name?: string;
  defaultValue: [number, number];
  max: number;
}) {
  const [localValues, setLocalValues] = useState(defaultValue);

  const handleValueChange = (newValues: any) => {
    setLocalValues(newValues);
  };

  return (
    <div className="grid gap-4 w-full max-w-80 rounded-[12px]">
      <Slider
        defaultValue={defaultValue}
        minStepsBetweenThumbs={defaultValue?.reduce((a, b) => a + b, 0) / 10}
        max={max}
        min={0}
        step={1}
        onValueChange={handleValueChange}
        className={cn('w-full')}
        name={name}
      />
      <div className="flex gap-2 flex-wrap">
        <ol className="flex items-center w-full gap-3">
          {localValues.map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between w-full border px-3 h-10 rounded-md"
            >
              <span>Ft</span>
              <span>{localValues[index]}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
