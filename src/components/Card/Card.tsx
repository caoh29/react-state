import { User } from "../../App"
import "./Card.css"

interface CardProps {
    content: User
}

export default function Card({ content }: CardProps) {
    return (
        <div className="mt-48 mb-96">
            <img className="mt-30 mb-0 photo" src={content.photo} alt={content.name} />
            <p className="mt-18 mb-0 resume">{content.resume}</p>
            <h5 className="mt-36 mb-0 name">{content.name}</h5>
            <p className="mt-12 mb-0 company">{content.company.role} at <br/> {content.company.name}</p>
        </div>
    )
} 
