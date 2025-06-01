import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { closeModal } from '../../redux/modalSlice';
import './modal.css';

const Modal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isOpen, type, title, text } = useSelector(
    (state: RootState) => state.modal
  );

  const handlerClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__content">
            <header className={`modal__header modal__header_${type}`}>
              <span className={`modal__icon modal__icon_${type}`}></span>
            </header>

            <div className="modal__info">
              <h3 className="modal__title">{title}</h3>
              <p className="modal__text">{text}</p>
            </div>

            <div className="modal__footer">
              <div className="modal__close" onClick={handlerClose}>
                Понятно
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
