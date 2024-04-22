'use client';

import { cn } from '@ultra-market/ui-utils';
import { Slider } from '@ultra-market/ui/slider';
import { useState } from 'react';

export function PriceControl() {
  const [localValues, setLocalValues] = useState([0, 100_000]);

  const handleValueChange = (newValues: any) => {
    setLocalValues(newValues);
  };

  return (
    <div className="grid gap-4 w-full max-w-80 rounded-[12px]">
      <Slider
        defaultValue={[100, 50_000]}
        minStepsBetweenThumbs={10_000}
        max={300_000}
        min={0}
        step={1}
        onValueChange={handleValueChange}
        className={cn('w-full')}
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
