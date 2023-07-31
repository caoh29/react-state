import { User } from '../../types';
import '../../App.css';
import "./Card.css"
import { NavLink, useLocation } from 'react-router-dom';

interface CardProps {
    content: User,
    isActive: boolean
}

export default function Card({ content, isActive }: CardProps) {
    const { pathname } = useLocation();

    const getURL = () => {
        if (pathname === '/') return `community/${content.id}`;
        if (pathname === '/community') return `${content.id}`;
        else return '';
    }
    return (
        <div className={`mt-48 mb-96 mx-auto ${isActive ? "card--active" : "card"}`}>
            <img className="mt-0 mb-0 photo" src={content.photo} alt={content.name} />
            <p className="mt-18 mb-0 resume">{content.resume}</p>
            {getURL() !== '' && <NavLink to={getURL()}><h5 className="mt-36 mb-0 name">{content.name}</h5></NavLink>}
            <p className="mt-12 mb-0 company">{content.company.role} at <br/> {content.company.name}</p>
        </div>
    )
} 
