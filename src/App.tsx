import SheepTable from './components/SheepTable.tsx';

function App() {
  const sheep = [1232, 5122, 241, 5342, 1242, 1234];

  return (
    <>
      <header></header>
      <main>
        <h1>Sheep ID</h1>
        <SheepTable sheep={sheep}/>
      </main>
      <footer></footer>
    </>
  )
}

export default App