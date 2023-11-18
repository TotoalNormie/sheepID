import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import searchImage from '../vision.ts';
import SheepRow from './SheepRow';
import { idToStringArray, idToString } from '../global/Functions';
import '../style/AddSheep.css';

interface Props {
	onDataChange: (data: string[]) => void;
	seen: boolean;
}

interface APIresponse {
	description: string;
}

const AddSheep = ({ onDataChange, seen }: Props) => {
	const [input, setInput] = useState<string>('');
	const [sheep, setSheep] = useState<string[]>([]);
	const [hidden, setHidden] = useState(false);
	const [error, SetError] = useState('');

	useEffect(() => {
		const sheepFormated = idToStringArray(sheep);
		// console.log('sheepFormated', JSON.stringify(sheepFormated));
		// console.log('sheep', JSON.stringify(sheep));
		if (JSON.stringify(sheep) !== JSON.stringify(sheepFormated)) {
			// console.log('sheep is diherent');
			setSheep(sheepFormated);
		}
		onDataChange(sheepFormated);
	}, [sheep]);

	useEffect(() => {
		setHidden(seen);
	}, [seen]);

	function handlechildChange(value: string, id: number): boolean {
		console.log(idToString(value), sheep.indexOf(idToString(value)), id);
		
		const sheepCheck: string[] = [...sheep];
		console.log(sheepCheck);

		sheepCheck.splice(id, 1);
		console.log(sheepCheck);
		if(sheepCheck.includes(idToString(value))) {
			SetError('Номер овцы уже есть в списке');
			return true;
		}
		console.log('still completes');
		
		const sheepClone: string[] = [...sheep];
		sheepClone[id] = value;

		SetError('');
		setSheep(sheepClone);
		return false;
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
		if (sheep.includes(idToString(input))) {
			SetError('Номер овцы уже есть в списке');
			return;
		}
		const sheepValue: string = input ? input : '';
		setSheep([...sheep, sheepValue]);
		setInput('');
		SetError('');
	};

	async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files || e.target.files.length === 0) {
			console.error('Файл не выбран');
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
			// console.log(Object.keys(textInImage.responses[0]).length === 0);
			if (Object.keys(textInImage.responses[0]).length === 0) {
				SetError('В фотографии не найдены номера овец.');
				return;
			}
			handleVisionText(textInImage.responses[0].textAnnotations);
		};

		reader.readAsDataURL(file);
	}

	async function handleVisionText(array: APIresponse[]) {
		// console.log(array);
		let newArray: string[] = [];
		for (let i = 1; i < array.length; i++) {
			// console.log(array[i]);
			if (array[i] !== null && typeof array[i] !== 'object') continue;
			const row = array[i];
			// console.log(row);
			if (!row.description) continue;
			const num = parseInt(row.description.replace(/[^0-9]/g, ''));
			// console.log(num);
			if (isNaN(num) || num <= 0) continue;
			const string = num.toString();
			// console.log('got to the end');
			newArray.push(string);
		}
		// console.log(newArray);
		if (newArray.length === 0) {
			SetError('В фотографии не найдены номера овец.');
			return;
		}
		SetError('');
		setSheep([...sheep, ...newArray]);
	}
	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const value: string = e.target.value;
		if (value.length > 4) return;
		const numValue: number = parseInt(value);
		console.log(numValue);
		if (isNaN(numValue) && value) return;
		if(numValue.toString() !== value && value) return;
		setInput(value);
	}
	return (
		<section id='AddSheep' className={hidden ? '' : 'hidden'}>
			<h3>Введите сущестующтх овец</h3>
			<form onSubmit={handleForm}>
				<input type='text' value={input} onInput={handleInput} />
				<button>Добавить номер</button>
			</form>
			<label className='custom-file-upload'>
				<input type='file' accept='image/*' onChange={handleImageChange} />
				Добавить номера с базы данных
			</label>
			<span className={error ? 'error' : ''}>{error}</span>
			<ol>{sheepList}</ol>
		</section>
	);
};

export default AddSheep;
