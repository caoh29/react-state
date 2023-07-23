// import { useEffect, useState } from "react"
import { IUser } from "../../App"

export default function Card({ data }: IUser) {

    // const [data, setData] = useState({
    //     name: 'Larry',
    //     photo: 'https://via.placeholder.com/150',
    //     resume: 'Lorem ipsilum dolor sit amet',
    //     company: {
    //         name: 'Facebook',
    //         role: 'Manager'
    //     }
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    //         const json = await response.json();
    //         // setData(json);
    //     };
    //     fetchData();
    // }, []);


    return (
        <div>
            <img src={data.photo} alt={data.name} />
            <p>{data.resume}</p>
            <h5>{data.name}</h5>
            <p>{data.company.role} at <br/> {data.company.name}</p>
        </div>
    )
}
