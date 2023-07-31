import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { RootState } from "../../data/store/store";
import { fetchUsers } from "../../data/reducers/usersSlice";
import Card from "../Card/Card";
import '../../App.css';
import './CommunityPage.css';
import { User } from "../../types";

type AsyncDispatch = ThunkDispatch<RootState, {}, AnyAction>;

export default function TopSection() {

    const dispatch = useDispatch<AsyncDispatch>();
    const users: User[] = useSelector((state: RootState) => state.usersContext.users);

    useEffect(() => {
        dispatch(fetchUsers('http://localhost:4000/community'));
    }, [dispatch]);

    return (
        <section>
            <h1 className='mt-72 mb-0 title'>Big Community of <br/> People Like You</h1>
            <NavLink className="link--absolute" to={"/"}>&larr; Back to main page</NavLink>
            <h4 className='mt-24 mb-0 mx-30 description'>We're proud of our products, and we're really excited when we get feedback from our users.</h4>
            <div className='cards-container'>
                {users.map((user: User) => <Card key={user.id} content={user} isActive={true} />)}
            </div>
        </section>
    )
};