import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../data/reducers/userSlice";
import { RootState } from "../../data/store/store";
import Card from "../Card/Card";
import '../../App.css';
import './TopSection.css';
import { User } from "../../types";

export default function TopSection() {

    const dispatch = useDispatch();
    const users: User[] = useSelector((state: RootState) => state.userContext.users);

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await fetch('http://localhost:4000/community');
            const { data }: { data: User[] } = await response.json();
            data.forEach((user: User) => dispatch(setUser(user)));
        };
        fetchData();
    }, [dispatch]);


    const [displayContent, setDisplayContent] = useState(false);

    // console.log(users);

    return (
        <section>
            <h1 className='mt-72 mb-0 title'>Big Community of <br/> People Like You</h1>
            <button className={displayContent ? 'mt-24 mb-0' : 'mt-24 mb-96'} onClick={() => setDisplayContent(!displayContent)}>{displayContent ? 'Hide' : 'Show'} section</button>
            {displayContent && (
                <>
                    <h4 className='mt-24 mb-0 mx-30 description'>We're proud of our products, and we're really excited when we get feedback from our users.</h4>
                    <div className='cards-container'>
                        {users.map((user: User) => <Card key={user.name} content={user} />)}
                    </div>
                </>
            )}
        </section>
    )
}
