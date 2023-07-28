import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../data/reducers/userSlice";
import { changeVisibility } from "../../data/reducers/showSectionSlice";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "../../data/store/store";
import { AnyAction } from "@reduxjs/toolkit";
import Card from "../Card/Card";
import '../../App.css';
import './TopSection.css';
import { User } from "../../types";


type AsyncDispatch = ThunkDispatch<RootState, {}, AnyAction>;

export default function TopSection() {

    const dispatch = useDispatch<AsyncDispatch>();
    const users: User[] = useSelector((state: RootState) => state.userContext.users);
    const isVisible: boolean = useSelector((state: RootState) => state.showSection.isVisible);

    useEffect(() => {
        dispatch(fetchUsers('http://localhost:4000/community'));
    }, [dispatch]);

    return (
        <section>
            <h1 className='mt-72 mb-0 title'>Big Community of <br/> People Like You</h1>
            <button className={isVisible ? 'mt-24 mb-0' : 'mt-24 mb-96'} onClick={() => dispatch(changeVisibility())}>{isVisible ? 'Hide' : 'Show'} section</button>
            {isVisible && (
                <>
                    <h4 className='mt-24 mb-0 mx-30 description'>We're proud of our products, and we're really excited when we get feedback from our users.</h4>
                    <div className='cards-container'>
                        {users.filter((user: User, index) => index !== 0).map((user: User) => <Card key={user.name} content={user} isActive={false} />)}
                        <Card content={users[0]} isActive={true} />
                    </div>
                </>
            )}
        </section>
    )
}
