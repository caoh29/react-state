import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../data/reducers/userSlice";
import Card from "../Card/Card";
import '../../App.css';
import './TopSection.css';
import { User } from "../../types";


export default function TopSection() {

    // const [data, setData] = useState([]);
    // const [description, setDescription] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('http://localhost:4000/community');
    //         const json = await response.json();
    //         setData(json.data);
    //         setDescription(json.description);
    //     };
    //     fetchData();
    // }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await fetch('http://localhost:4000/community');
            const { data }: { data: User[] } = await response.json();
            data.forEach((user: User) => dispatch(setUser(user)));
        };
        fetchData();
    }, [dispatch]);


    const [displayContent, setDisplayContent] = useState(false);

    return (
        <section>
            <h1 className='mt-72 mb-0 title'>Big Community of <br/> People Like You</h1>
            <button className={displayContent ? 'mt-24 mb-0' : 'mt-24 mb-96'} onClick={() => setDisplayContent(!displayContent)}>{displayContent ? 'Hide' : 'Show'} section</button>
            {displayContent && (
                <>
                    <h4 className='mt-24 mb-0 mx-30 description'>We're proud of our products, and we're really excited when we get feedback from our users.</h4>
                    <div className='cards-container'>
                        {/* {data.map((user: User) => <Card key={user.name} />)} */}
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </>
            )}
        </section>
    )
}
