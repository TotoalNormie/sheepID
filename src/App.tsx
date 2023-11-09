import { useState, useRef, FormEvent, useEffect, ChangeEvent } from "react";
import searchImage from "./vision.ts";
import SheepRow from "./components/SheepRow";
import { idToString, idToStringArray } from "./global/Functions";

function App() {
    const [input, setInput] = useState<string>("");

    const [sheep, setSheep] = useState<string[]>(
        idToStringArray(["1423", "12", "532", "533", "6734"])
    );

    useEffect(() => {
        const sheepFormated = idToStringArray(sheep);
        if (JSON.stringify(sheep) !== JSON.stringify(sheepFormated)) {
            setSheep(sheepFormated);
            console.log("sheep: ", sheepFormated);
        }
    }, [sheep]);

    function handlechildChange(value: string, id: number) {
        console.log("handle");
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
        console.log(input);
        if (!input) return;
        const sheepValue: string = input ? input : "";
        setSheep([...sheep, sheepValue]);
        setInput("");
    };

    async function handleVisionText(array: object[]) {
        console.log(array);
        let newArray: number[] = [];
        for (let i = 1; i < array.length; i++) {
            const num = parseInt(array[i].description.replace(/[^0-9]/g, ""));
            // console.log(num);
            if (isNaN(num) || num <= 0) continue;
            newArray.push(num);
        }
        setSheep(idToStringArray([...sheep, ...newArray]));
    }
    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("No file selected.");
            return;
        }

        const file = e.target.files[0];
        // console.log(file);
        const reader = new FileReader();

        reader.onload = async function (e: ProgressEvent) {
            // console.log(e);
            const base64Image = (e.target as any).result.split(",")[1];
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
        <>
            <header></header>
            <main>
                <h1>Sheep ID</h1>
                <ol>{sheepList}</ol>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                />
                <form onSubmit={handleForm}>
                    <input type='number' value={input} onInput={handleInput} />
                    <button>Add sheep</button>
                </form>
            </main>
            <footer></footer>
        </>
    );
}

export default App;
