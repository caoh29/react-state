import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "@reduxjs/toolkit";
import { NavLink, useParams } from 'react-router-dom';
import { fetchUser } from "../../data/reducers/userCardSlice";
import { RootState } from "../../data/store/store";
import Card from "../Card/Card";
import '../../App.css';
import { User } from "../../types";

type AsyncDispatch = ThunkDispatch<RootState, {}, AnyAction>;

export default function UserPage() {

    const { userId } = useParams();

    const dispatch = useDispatch<AsyncDispatch>();
    const user: User = useSelector((state: RootState) => state.userCard.user);

    useEffect(() => {
        dispatch(fetchUser(`http://localhost:4000/community/${userId}`));
    }, [dispatch, userId]);

    return (
        <section>
            <h1 className='mt-72 mb-0 title'>{user.name}</h1>
            <Card content={user} isActive={true} />
            <NavLink className="link" to={"/"}>&larr; Back to main page</NavLink>
        </section>
    )
}