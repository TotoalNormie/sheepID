import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";

interface Props {
    children: number;
}

function idToString(id: number): string {
    let str: string = id.toString();
    if (str.length > 4) str = str.slice(0, 4);
    while (str.length < 4) {
        str = "0" + str;
    }
    return str;
}

const SheepRow = ({ children }: Props) => {
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
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter") toggleInput();
    }

    return (
        <li ref={li}>
            <form>

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
            </form>
        </li>
    );
};

export default SheepRow;
