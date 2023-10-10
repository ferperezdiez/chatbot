import './modal.css'


const Modal = ({title, content, setShowModal}) => {

    return(
            <div className="container">
                <button className='closeModal' onClick={() => setShowModal(false)}>X</button>
                <h3 className='content'>{title}</h3>
                <label className='content'>{content}</label>
            </div>
    )
}

export default Modal;