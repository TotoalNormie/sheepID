import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";

import { idToString } from '../global/Functions';
 
interface Props {
    children: number;
    index: number;
    onIDchange: (value: string, id: number) => void;
}

const SheepRow = ({ children, index, onIDchange }: Props) => {
    const li = useRef<HTMLLIElement>(null);
    const [showInput, setShowInput] = useState<boolean>(false);
    const [number, setNumber] = useState<string>(idToString(children));
    function deleteRow() {
        if (!li.current) {
            console.error("li element doesnt exist");
            return;
        }
        li.current.remove();
    }

    function toggleInput() {
        if (number === "") return;
        setNumber(idToString(parseInt(number)));
        setShowInput(!showInput);
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        console.log(e);
        e.preventDefault();
        const value: string = e.target.value;
        if (value.length > 4) return;
        if (value.length === 0) {
            setNumber("");
            return;
        }
        const numValue: number = parseInt(value);
        console.log();
        if (isNaN(numValue)) return;
        setNumber(numValue.toString());
        onIDchange(number, index);
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter") toggleInput();
    }

    return (
        <li ref={li}>
            {showInput ? (
                <input
                type='number'
                name='id'
                value={number}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                onBlur={toggleInput}
                />
                ) : (
                    <span>{number}</span>
                    )}
            <button onClick={toggleInput}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={deleteRow}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    );
};

export default SheepRow;
