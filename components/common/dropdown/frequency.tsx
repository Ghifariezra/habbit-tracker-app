import { memo } from "react";
import { Picker } from "@react-native-picker/picker";
import { FrequencyOption } from "@/data/dropdown/frequency";
import { FreqType } from "@/types/habbits";

export const FrequencyDropdown = memo(({ data, value, setValue }: {
    data: FrequencyOption[];
    value: FrequencyOption["value"];
    setValue: (value: FreqType) => void;
}) => {

    return (
        <Picker
            selectedValue={value}
            onValueChange={(value) => setValue(value)}
        >
            {data.map(f => (
                <Picker.Item key={f.value} label={f.label} value={f.value} />
            ))}
        </Picker>
    );
});

FrequencyDropdown.displayName = "FrequencyDropdown";