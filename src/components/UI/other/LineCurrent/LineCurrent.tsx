import './lineCurrent.css';

const LineCurrent = ({ num }: { num: number }) => {
  const index = num - 1;
  const lineClassNamesList = [];

  for (let i = 0; i < 4; i++) {
    if (i < index) {
      lineClassNamesList.push('line-current__item line-current__item_active');
    } else if (i === index) {
      lineClassNamesList.push(
        'line-current__item line-current__item_active line-current__item_current'
      );
    } else {
      lineClassNamesList.push('line-current__item');
    }
  }

  return (
    <ul className="line-current">
      <li className={lineClassNamesList[0]}>
        <div className="line-current__number">1</div>
        <div className="line-current__text">билеты</div>
      </li>
      <li className={lineClassNamesList[1]}>
        <div className="line-current__number">2</div>
        <div className="line-current__text">пассажиры</div>
      </li>
      <li className={lineClassNamesList[2]}>
        <div className="line-current__number">3</div>
        <div className="line-current__text">оплата</div>
      </li>
      <li className={lineClassNamesList[3]}>
        <div className="line-current__number">4</div>
        <div className="line-current__text">проверка</div>
      </li>
    </ul>
  );
};

export default LineCurrent;
