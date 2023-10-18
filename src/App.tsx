import SheepRow from './components/SheepRow.tsx';
import { useState, useRef, FormEvent} from 'react';

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

  return (
    <>
      <header></header>
      <main>
        <h1>Sheep ID</h1>
        <ol>
          {sheepList}
        </ol>
        <form onSubmit={handleForm}>
        <input type="number" name="" id="" ref={input}/>
        <button>Add sheep</button>
        </form>
      </main>
      <footer></footer>
    </>
  )
}

export default App