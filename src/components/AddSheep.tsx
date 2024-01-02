import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import searchImage from "../vision.ts";
import SheepRow from "./SheepRow";
import { idToStringArray, idToString } from "../global/Functions";
import style from "../style/AddSheep.module.css";
import { useDataContext } from "../context/DataContext.tsx";
import getData from "../global/getData.tsx";

interface APIresponse {
    description: string;
}
type Props = {
    titile: string;
};

type Data = {
    date: string;
    sheep: string;
    id: string;
};

const AddSheep = ({ title }: Props) => {
    const [input, setInput] = useState<string>("");
    // const [realSheep, setRealSheep] = useState<string[]>([]);
    const [error, SetError] = useState("");
    const [dateSheep, setDateSheep] = useState<Data[]>([]);

    const { realSheep, setRealSheep } = useDataContext();
    useEffect(() => {
        const outputData = async () => {
            const data = await getData("realSheep");
            setDateSheep(data);
            console.log("data", data);
        };
        outputData();
    }, []);

    const dropdown = dateSheep.map((data) => (
        <option value={data.date}>{data.date}</option>
    ));
    // setRealSheep([...realSheep, 'test']);

    // useEffect(() => {
    // 	const sheepFormated = idToStringArray(realSheep);
    // 	// console.log('sheepFormated', JSON.stringify(sheepFormated));
    // 	// console.log('realSheep', JSON.stringify(realSheep));
    // 	if (JSON.stringify(realSheep) !== JSON.stringify(sheepFormated)) {
    // 		// console.log('realSheep is diherent');
    // 		setRealSheep(sheepFormated);
    // 	}
    // 	onDataChange(sheepFormated);
    // }, [realSheep]);

    function handlechildChange(value: string, id: number): boolean {
        console.log(
            idToString(value),
            realSheep.indexOf(idToString(value)),
            id
        );

        const sheepCheck: string[] = [...realSheep];
        console.log(sheepCheck);

        sheepCheck.splice(id, 1);
        console.log(sheepCheck);
        if (sheepCheck.includes(idToString(value))) {
            SetError("Номер овцы уже есть в списке");
            return true;
        }
        console.log("still completes");

        const sheepClone: string[] = [...realSheep];
        sheepClone[id] = value;

        SetError("");
        setRealSheep(sheepClone);
        return false;
    }

    const sheepList = realSheep.map((num: string, index: number) => {
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
        if (realSheep.includes(idToString(input))) {
            SetError("Номер овцы уже есть в списке");
            return;
        }
        const sheepValue: string = input ? input : "";
        setRealSheep([...realSheep, sheepValue]);
        setInput("");
        SetError("");
    };

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Файл не выбран");
            return;
        }

        const file = e.target.files[0];
        // console.log(file);
        const reader = new FileReader();

        reader.onload = async function (e: ProgressEvent) {
            // console.log(e);
            const base64Image = (e.target as any).result.split(",")[1];
            const textInImage = await searchImage(base64Image);
            // console.log(textInImage);
            // console.log(Object.keys(textInImage.responses[0]).length === 0);
            if (Object.keys(textInImage.responses[0]).length === 0) {
                SetError("В фотографии не найдены номера овец.");
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
            if (array[i] !== null && typeof array[i] !== "object") continue;
            const row = array[i];
            // console.log(row);
            if (!row.description) continue;
            const num = parseInt(row.description.replace(/[^0-9]/g, ""));
            // console.log(num);
            if (isNaN(num) || num <= 0) continue;
            const string = num.toString();
            // console.log('got to the end');
            newArray.push(string);
        }
        // console.log(newArray);
        if (newArray.length === 0) {
            SetError("В фотографии не найдены номера овец.");
            return;
        }
        SetError("");
        setRealSheep([...realSheep, ...newArray]);
    }
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        const value: string = e.target.value;
        if (value.length > 4) return;
        const numValue: number = parseInt(value);
        console.log(numValue);
        if (isNaN(numValue) && value) return;
        if (numValue.toString() !== value && value) return;
        setInput(value);
    }
    return (
        <section id='AddSheep'>
            <h3>Введите сущестующтх овец</h3>
            <select name="" id="">
                <option value="" selected disabled></option>
                { dropdown }
            </select>
            <div className={style.top}>
                <form className={style.form} onSubmit={handleForm}>
                    <input type='text' value={input} onInput={handleInput} />
                    <button>Добавить номер</button>
                </form>
            </div>
            <label className='custom-file-upload'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                />
                Добавить номера с базы данных
            </label>
            <span className={error ? "error" : ""}>{error}</span>
            <ol>{sheepList}</ol>
        </section>
    );
};

export default AddSheep;
