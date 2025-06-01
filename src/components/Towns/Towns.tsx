import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import {
  setStartTown,
  setStartTownTooltip,
  setEndTown,
  setEndTownTooltip,
} from '../../redux/searchFormSlice';
import {
  clearTowns,
  setIsClicked,
  setIsOpenedStartList,
  setIsOpenedEndList,
} from '../../redux/townsSlice';

import { ITown } from '../../models/models';
import './towns.css';

const Towns = ({ isStart }: { isStart: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const { towns } = useSelector((state: RootState) => state.towns);

  const handleMouseDown = (town: ITown) => {
    dispatch(setIsClicked(true)); // произошел клик => по 'blur' на инпуте ничего не делаем!
    dispatch(clearTowns()); // очищаем массив с подходящими городами

    if (isStart) {
      dispatch(setStartTown(town)); // устанавливаем выбранный город
      dispatch(setStartTownTooltip('')); // убираем подсказку (если она есть)
      dispatch(setIsOpenedStartList(false)); // закрываем список с городами
      return;
    }

    dispatch(setEndTown(town)); // устанавливаем выбранный город
    dispatch(setEndTownTooltip('')); // убираем подсказку (если она есть)
    dispatch(setIsOpenedEndList(false)); // закрываем список с городами
  };

  // FIXME: косяк с отображением <ul> в Safari !!!
  return (
    <ul className="towns">
      {towns.length ? (
        towns.map((town) => (
          <li
            key={town._id}
            className="towns__item"
            onMouseDown={() => handleMouseDown(town)} // 'mouseDown' - срабатывает ПЕРЕД 'blur' !!!
          >
            {town.name}
          </li>
        ))
      ) : (
        <li className="towns__item towns__item_not-found">
          ничего не найдено...
        </li>
      )}
    </ul>
  );
};

export default Towns;
