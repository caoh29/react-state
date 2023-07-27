import { useSelector } from 'react-redux';
import { UserState } from '../../data/store/store';
import { User } from '../../types';
import '../../App.css';
import "./Card.css"


export default function Card() {

    const user: User = useSelector((state: UserState) => state.user);

    return (
        <div className="mt-48 mb-96 mx-auto card">
            <img className="mt-0 mb-0 photo" src={user.photo} alt={user.name} />
            <p className="mt-18 mb-0 resume">{user.resume}</p>
            <h5 className="mt-36 mb-0 name">{user.name}</h5>
            <p className="mt-12 mb-0 company">{user.company.role} at <br/> {user.company.name}</p>
        </div>
    )
}
