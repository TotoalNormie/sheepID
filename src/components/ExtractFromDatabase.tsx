import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
	handleDataChange: (data: string[]) => void;
}

const ExtractFromDatabase = ({ handleDataChange }: Props) => {
	const ol = useRef<HTMLOListElement | null>(null);
	const [data, setData] = useState<string[]>([]);

	useEffect(() => {
    handleDataChange(data);
  }, [data]);

	const dataOutput = data.map((id: string, index: number) => <li key={index}>{id}</li>);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.files[0]);

		const reader = new FileReader();

		// Set up an event listener for when the file is loaded
		reader.onload = function (e: ProgressEvent) {
			// e.target.result contains the contents of the file
			if (e.target === null) return;
			console.log(e.target);
			const target = e.target;
			const fileContents = target.result;
			handleCSV(fileContents);
		};

		// Read the file as text
		reader.readAsText(e.target.files[0]);
	};

	function handleCSV(csv: string) {
		const array = csv.split('\n').filter((elem: string) => elem !== '');
		array.shift();
		const idArray = array.map((row: string) => {
			const values = row.split(';');
			console.log(values[1]);
			const id = values[1].slice(-4);
			return id;
		});
		console.log(idArray);
		setData(idArray);
		// console.log(array);
	}
	return (
		<section>
			<input type='file' accept='.csv' onChange={handleFileChange} />
			<ol>{dataOutput}</ol>
		</section>
	);
};

export default ExtractFromDatabase;
