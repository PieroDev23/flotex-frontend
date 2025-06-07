import { NativeSelect } from "@chakra-ui/react"
import React from "react"




export const Select:
  React.FC<{
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: { label: string, value: string }[]
    value?: string
    ref: React.Ref<any>
  }> =
  ({ onChange, options, value, ref }) => {

    return (
      <NativeSelect.Root>
        <NativeSelect.Field onChange={onChange} value={value} ref={ref}>
          <option value="">Escoge una opción</option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    )
  }