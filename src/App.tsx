import SheepRow from './components/SheepRow.tsx';

function App() {
  const sheep = [1232, 5122, 241, 5342, 1242, 1234];
  const sheepList = sheep.map((num: number) => { return <SheepRow>{num}</SheepRow>});
  return (
    <>
      <header></header>
      <main>
        <h1>Sheep ID</h1>
        <ol>
          {sheepList}
        </ol>
      </main>
      <footer></footer>
    </>
  )
}

export default App