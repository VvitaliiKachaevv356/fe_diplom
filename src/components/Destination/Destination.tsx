import { useRef, useState } from 'react';
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
  fetchTowns,
  setIsClicked,
  setIsOpenedStartList,
  setIsOpenedEndList,
} from '../../redux/townsSlice';

import Towns from '../Towns/Towns';
import './destination.css';
import Tooltip from '../Tooltip/Tooltip';

const Destination = ({ isStart }: { isStart: boolean }) => {
  const [currentValue, setCurrentValue] = useState(''); // до тех пор, пока нет объекта startTown
  const inputRef = useRef<HTMLInputElement | null>(null); // рефка для input-а

  const dispatch: AppDispatch = useDispatch();
  const { startTown, startTownTooltip, endTown, endTownTooltip } = useSelector(
    (state: RootState) => state.searchForm
  );
  const { towns, isClicked, isOpenedStartList, isOpenedEndList } = useSelector(
    (state: RootState) => state.towns
  );

  // обработчик клика по иконке:
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // устанавливаем фокус на input-е
      dispatch(isStart ? setStartTown(null) : setEndTown(null)); // сбрасываем город
    }
  };

  // событие 'change' (город отправления):
  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 1. сбрасываем startTown, если он был установлен:
    if (startTown) {
      dispatch(setStartTown(null));
    }

    // 2. подменяем содержимое инпут-а:
    setCurrentValue(event.target.value);

    // 3. выполняем поиск городов по введённой строке:
    dispatch(fetchTowns(event.target.value));

    // 4. открываем список с подходящими городами:
    dispatch(setIsOpenedStartList(true));
  };

  // событие 'change' (город прибытия):
  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 1. сбрасываем endTown, если он был установлен:
    if (endTown) {
      dispatch(setEndTown(null));
    }

    // 2. подменяем содержимое инпут-а:
    setCurrentValue(event.target.value);

    // 3. выполняем поиск городов по введённой строке:
    dispatch(fetchTowns(event.target.value));

    // 4. открываем список с подходящими городами:
    dispatch(setIsOpenedEndList(true));
  };

  // событие 'blur' (город отправления):
  const handleBlurStart = () => {
    // 1. если произошел клик на городе <li>, то не надо обрабатывать 'blur' на инпуте -> выходим!
    if (isClicked) {
      setCurrentValue(''); // очищаем содержимое input-а, чтобы не было бага при смене городов
      dispatch(setIsClicked(false)); // сбрасываем флаг клика на городе <li>
      return;
    }

    // 2. если текст в инпуте совпал с названием города из выпадающего списка, то устанавливаем его:
    const foundTown = towns.find(
      (town) => town.name === currentValue.toLowerCase().trim()
    );

    if (foundTown) {
      dispatch(setStartTown(foundTown)); // устанавливаем город отправления
      dispatch(setStartTownTooltip('')); // убираем подсказку (если она есть)
    }

    // 3. очищаем содержимое input-а, чтобы не было бага при смене городов местами, если нет города:
    setCurrentValue('');

    // 4. закрываем список с подходящими городами:
    dispatch(setIsOpenedStartList(false));

    // 5. очищаем массив с подходящими городами:
    dispatch(clearTowns());
  };

  // событие 'blur' (город прибытия):
  const handleBlurEnd = () => {
    // 1. если произошел клик на городе <li>, то не надо обрабатывать 'blur' на инпуте -> выходим!
    if (isClicked) {
      setCurrentValue(''); // очищаем содержимое input-а, чтобы не было бага при смене городов
      dispatch(setIsClicked(false)); // сбрасываем флаг клика на городе <li>
      return;
    }

    // 2. если текст в инпуте совпал с названием города из выпадающего списка, то устанавливаем его:
    const foundTown = towns.find(
      (town) => town.name === currentValue.toLowerCase().trim()
    );

    if (foundTown) {
      dispatch(setEndTown(foundTown)); // устанавливаем город прибытия
      dispatch(setEndTownTooltip('')); // убираем подсказку (если она есть)
    }

    // 3. очищаем содержимое input-а, чтобы не было бага при смене городов местами, если нет города:
    setCurrentValue('');

    // 4. закрываем список с подходящими городами:
    dispatch(setIsOpenedEndList(false));

    // 5. очищаем массив с подходящими городами:
    dispatch(clearTowns());
  };

  return (
    <div className="destination">
      <input
        className="destination__input"
        type="text"
        placeholder={isStart ? 'Откуда' : 'Куда'}
        value={(isStart ? startTown?.name : endTown?.name) || currentValue} // город || текст инпута
        onChange={isStart ? handleChangeStart : handleChangeEnd}
        onBlur={isStart ? handleBlurStart : handleBlurEnd}
        ref={inputRef}
      />
      <span className="destination__icon" onClick={handleIconClick}></span>

      {(isStart ? isOpenedStartList : isOpenedEndList) && (
        <Towns isStart={isStart} />
      )}

      {/* показываем подсказку если поле пустое или некорректное */}
      <Tooltip text={isStart ? startTownTooltip : endTownTooltip} />
    </div>
  );
};

export default Destination;
