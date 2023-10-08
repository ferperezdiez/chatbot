import './modal.css'


const Modal = ({title, content, setShowModal}) => {

    return(
        <div className="container">
            <button className='closeModal' onClick={() => setShowModal(false)}>X</button>
            <h3>{title}</h3>
            <label className='modal-content'>{content}</label>
        </div>
    )
}

export default Modal;