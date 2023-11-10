import { useState, useRef, FormEvent, useEffect, ChangeEvent } from 'react';
import searchImage from '../vision.ts';
import SheepRow from './SheepRow';
import { idToStringArray } from '../global/Functions';

interface Props {
	data: string[];
	onDataChange: (data: string[]) => void;
}

const AddSheep = ({ data, onDataChange }: Props) => {
	const [input, setInput] = useState<string>('');

	const [sheep, setSheep] = useState<string[]>(data);

	useEffect(() => {
		const sheepFormated = idToStringArray(sheep);
		console.log('sheepFormated', JSON.stringify(sheepFormated));
		if (JSON.stringify(sheep) !== JSON.stringify(sheepFormated)) {
			setSheep(sheepFormated);
			onDataChange(sheepFormated);
		}
	}, [sheep]);

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

	async function handleVisionText(array: object[]) {
		// console.log(array);
		let newArray: string[] = [];
		for (let i = 1; i < array.length; i++) {
			const num = parseInt(array[i].description.replace(/[^0-9]/g, ''));
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
			console.log(textInImage);
			handleVisionText(textInImage.responses[0].textAnnotations);
		};

		reader.readAsDataURL(file);
	}
	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const value: string = e.target.value;
		if (value.length > 4) return;
		if (value.length === 0) {
			return;
		}
		setInput(value);
	}

	return (
		<section>
			<h1>Sheep ID</h1>
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
