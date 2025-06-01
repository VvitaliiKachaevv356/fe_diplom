import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/trainsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import './pagination.css';

const Pagination = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, currentCount, trains } = useSelector(
    (state: RootState) => state.trains
  );

  const totalPages = Math.ceil(trains.length / currentCount);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handlePage = (index: number) => {
    if (currentPage !== index + 1) {
      dispatch(setCurrentPage(index + 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li
          className={`pagination__previous${
            currentPage > 1 ? ' pagination__previous-active' : ''
          }`}
          onClick={handlePrevPage}
        ></li>

        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`pagination__item${
              currentPage === index + 1 ? ' pagination__item_active' : ''
            }`}
            onClick={() => handlePage(index)}
          >
            {index + 1}
          </li>
        ))}

        <li
          className={`pagination__next${
            currentPage < totalPages ? ' pagination__next-active' : ''
          }`}
          onClick={handleNextPage}
        ></li>
      </ul>
    </div>
  );
};

export default Pagination;
