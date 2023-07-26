import Form from "../Form/Form";
import '../../App.css';
import './BottomSection.css';

export default function BottomSection() {
    return (
        <section className='join-section'>
            <h1 className='mt-72 mb-0 title--white'>Join Our Program</h1>
            <p className='mt-24 mb-0 mx-30 join-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam.</p>
            <Form />
        </section>
    )
}
