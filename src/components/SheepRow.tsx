import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';

interface Props {
	children: string;
	index: number;
	onIDchange: (value: string, id: number) => boolean;
}

const SheepRow = ({ children, index, onIDchange }: Props) => {
	const li = useRef<HTMLLIElement>(null);
	const [showInput, setShowInput] = useState<boolean>(false);
	const [number, setNumber] = useState(children);
	const [error, setError] = useState(false);

	useEffect(() => {
		setNumber(children);
	}, [children]);

	// console.log(children);
	function deleteRow() {
		if (!li.current) {
			console.error('li element doesnt exist');
			return;
		}
		li.current.remove();
	}

	function toggleInput() {
		if (number === '') return;
		if(showInput) {
			const freshError = onIDchange(number, index);
			setError(freshError);
			if(freshError) return;
			console.log('didnt return');
		}	
		setShowInput(!showInput);
	}

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		// console.log(e);
		e.preventDefault();
		const value: string = e.target.value;
		if (value.length > 4) return;
		if (value.length === 0) {
			setNumber('');
			return;
		}
		const numValue: number = parseInt(value);
		if (isNaN(numValue)) return;
		setNumber(numValue.toString());
	}

	function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') toggleInput();
	}

	return (
		<li ref={li} className={(showInput ? 'edit' : '') +' '+ (error ? 'errorID' : '')}>
			{showInput ? (
				<input
					name='id'
					value={number}
					onChange={handleInput}
					onKeyDown={handleKeyPress}
					onBlur={toggleInput}
					autoFocus
				/>
			) : (
				<span>{number}</span>
			)}
			<button onClick={toggleInput} className='editButton'>
				<FontAwesomeIcon icon={faPen} />
			</button>
			<button onClick={deleteRow} className='deleteButton'>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</li>
	);
};

export default SheepRow;
