import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
interface Props {
    children: number;
}

const SheepRow = ({ children }: Props) => {

    return (
        <li>
            {children}
            <button>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    );
}

export default SheepRow;