import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import searchImage from '../vision.ts';
import SheepRow from './SheepRow';
import { idToStringArray } from '../global/Functions';

interface Props {
	onDataChange: (data: string[]) => void;
	seen: boolean;
}

interface APIresponse {
	description: string;
}

const AddSheep = ({ onDataChange, seen }: Props) => {
	const [input, setInput] = useState<string>('');

	const [sheep, setSheep] = useState<string[]>(['1423', '12', '532', '533', '6734']);

	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const sheepFormated = idToStringArray(sheep);
		console.log('sheepFormated', JSON.stringify(sheepFormated));
		console.log('sheep', JSON.stringify(sheep));
		if (JSON.stringify(sheep) !== JSON.stringify(sheepFormated)) {
			console.log('sheep is diherent')
			setSheep(sheepFormated);
		}
		onDataChange(sheepFormated);
	}, [sheep]);

	useEffect(() => {
		setHidden(seen);
	}, [seen])

	function handlechildChange(value: string, id: number) {
		const sheepClone: string[] = [...sheep];
		sheepClone[id] = value;

		setSheep(sheepClone);
	}

	const sheepList = sheep.map((num: string, index: number) => {
		return (
			<SheepRow onIDchange={handlechildChange} key={index} index={index}>
				{num}
			</SheepRow>
		);
	});
	const handleForm = (e: FormEvent) => {
		e.preventDefault();
		// console.log(input);
		if (!input) return;
		const sheepValue: string = input ? input : '';
		setSheep([...sheep, sheepValue]);
		setInput('');
	};

	async function handleVisionText(array: APIresponse[]) {
		// console.log(array);
		let newArray: string[] = [];
		for (let i = 1; i < array.length; i++) {
			if(!Array.isArray(array[i])) continue;
			const row = array[i];
			if(!row.description) continue;
			const num = parseInt(row.description.replace(/[^0-9]/g, ''));
			// console.log(num);
			if (isNaN(num) || num <= 0) continue;
			const string = num.toString();
			newArray.push(string);
		}
		setSheep([...sheep, ...newArray]);
	}
	async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files || e.target.files.length === 0) {
			console.error('No file selected.');
			return;
		}

		const file = e.target.files[0];
		// console.log(file);
		const reader = new FileReader();

		reader.onload = async function (e: ProgressEvent) {
			// console.log(e);
			const base64Image = (e.target as any).result.split(',')[1];
			const textInImage = await searchImage(base64Image);
			// console.log(textInImage);
			handleVisionText(textInImage.responses[0].textAnnotations);
		};

		reader.readAsDataURL(file);
	}
	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const value: string = e.target.value;
		if (value.length > 4) return;
		const numValue: number = parseInt(value);
        if (isNaN(numValue) && value) return;
		setInput(value);
	}

	return (
		<section className={hidden ? '' : 'hidden'}>
			<h2>Введите сущестующтх овец</h2>
			<form onSubmit={handleForm}>
				<input type='number' value={input} onInput={handleInput} />
				<button>Add sheep</button>
			</form>
			<input type='file' accept='image/*' onChange={handleImageChange} />
			<ol>{sheepList}</ol>
		</section>
	);
}

export default AddSheep;
