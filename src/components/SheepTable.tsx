import SheepRow from "./SheepRow";
import { useState, useEffect, useRef } from "react";
import { idToString } from "../global/Functions";

interface Props {
    data: string[];
    onDataChange: (data: string[]) => void;
}

const SheepTable = ({ data, onDataChange }: Props) => {
    const [sheep, setSheep] = useState<string[]>(data);
    useEffect(() => {
        setSheep(data);
        // Update local state when data prop changes
    }, [data]);

    useEffect(() => {
      onDataChange(sheep); // Notify the parent component about data changes
  }, [sheep, onDataChange]);

    const sheepList = sheep.map((num: string, index: number) => {
        return (
            <SheepRow onIDchange={handlechildChange} key={index} index={index}>
                {num}
            </SheepRow>
        );
    });

    function handlechildChange(value: string, id: number) {
        console.log("handle");
        const sheepClone: string[] = [...sheep];
        sheepClone[id] = value;

        setSheep(sheepClone);
    }

    return <ul>{sheepList}</ul>;
};

export default SheepTable;
