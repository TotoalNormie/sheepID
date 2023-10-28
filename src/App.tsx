import SheepRow from './components/SheepRow.tsx';
import { useState, useRef, FormEvent} from 'react';
import searchImage from './vision.ts';



function App() {
  const [sheep, setSheep] = useState([1232, 5122, 241, 5342, 1242, 1234]);
  const sheepList = sheep.map((num: number, index: number) => { return <SheepRow key={index}>{num}</SheepRow> });
  const input = useRef<HTMLInputElement>(null);

  const handleForm = (e: FormEvent ) => {
    e.preventDefault();
    if(!input) return;
    console.log(input, input.current?.value);
  const sheepValue:string = input.current?.value ? input.current?.value : '';
    if(sheepValue?.length > 4) return;
    const newSheepNum = Number(sheepValue);
    setSheep([...sheep, newSheepNum]);
  } 

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error('No file selected.');
      return;
    }
  
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
  
    reader.onload = function (event: ProgressEvent) {
      const base64Image = event.target.result.split(',')[1];
      const textInImage = searchImage(base64Image);
      console.log(textInImage);
    };
  
    reader.readAsDataURL(file);
  }


  return (
    <>
      <header></header>
      <main>
        <h1>Sheep ID</h1>
        <ol>
          {sheepList}
        </ol>
        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <form onSubmit={handleForm}>
        <input type="number" ref={input}/>
        <button>Add sheep</button>
        </form>
      </main>
      <footer></footer>
    </>
  )
}

export default App;