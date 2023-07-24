import { User } from "../../App"

interface CardProps {
    content: User
}

export default function Card({ content }: CardProps) {
    return (
        <div>
            <img src={content.photo} alt={content.name} />
            <p>{content.resume}</p>
            <h5>{content.name}</h5>
            <p>{content.company.role} at <br/> {content.company.name}</p>
        </div>
    )
} 
