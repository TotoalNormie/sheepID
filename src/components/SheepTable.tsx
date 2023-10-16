
interface Props {
    sheep: number[];
}

const SheepTable = ({sheep}: Props) => {
    const iterateSheep = sheep.map((text: number) => (
        <div>{text}</div>
    ));
    return (
        <div className="table">
            {iterateSheep}
        </div>
    );
}

export default SheepTable;