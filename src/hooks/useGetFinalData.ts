import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useGetFinalData = () => {
  const {
    lastName: payerLastName,
    firstName: payerFirstName,
    middleName: payerMiddleName,
    phoneNumber,
    email,
    cash,
  } = useSelector((state: RootState) => state.payment);

  const {
    route_direction_id: departureRouteDirectionId,
    orderList: departureOrderList,
  } = useSelector((state: RootState) => state.departure);

  const {
    route_direction_id: arrivalRouteDirectionId,
    orderList: arrivalOrderList,
  } = useSelector((state: RootState) => state.arrival);

  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  // 1. получаем данные плательщика:
  const user = {
    first_name: payerFirstName.value,
    last_name: payerLastName.value,
    patronymic: payerMiddleName.value,
    phone: '8' + phoneNumber.value.slice(2), // замена '+7' на '8'
    email: email.value,
    payment_method: cash ? 'cash' : 'online',
  };

  // массив данных о взрослых пассажирах:
  const adultPassengersInfo = passengersList
    .filter((passenger) => passenger.data.type === 'Взрослый')
    .map((passenger) => {
      const {
        lastName,
        firstName,
        middleName,
        gender,
        birthdate,
        passportSeries,
        passportNumber,
      } = passenger.data;

      return {
        is_adult: true,
        first_name: firstName.value,
        last_name: lastName.value,
        patronymic: middleName.value,
        gender,
        birthday: birthdate.value.split('.').reverse().join('-'),
        document_type: 'паспорт',
        document_data: `${passportSeries.value} ${passportNumber.value}`,
      };
    });

  // массив данных о детях пассажирах:
  const childrenPassengersInfo = passengersList
    .filter((passenger) => passenger.data.type === 'Детский')
    .map((passenger) => {
      const {
        lastName,
        firstName,
        middleName,
        gender,
        birthdate,
        certificateNumber,
      } = passenger.data;

      return {
        is_adult: false,
        first_name: firstName.value,
        last_name: lastName.value,
        patronymic: middleName.value,
        gender,
        birthday: birthdate.value.split('.').reverse().join('-'),
        document_type: 'свидетельство',
        document_data: certificateNumber.value,
      };
    });

  // копии массивов пассажиров для работы:
  const departureAdultPassengersInfoCopy = [...adultPassengersInfo]; // взрослые - 'туда'
  const arrivalAdultPassengersInfoCopy = [...adultPassengersInfo]; // взрослые - 'обратно'

  const departureChildrenPassengersInfoCopy = [...childrenPassengersInfo]; // дети - 'туда'
  const arrivalChildrenPassengersInfoCopy = [...childrenPassengersInfo]; // дети - 'обратно'

  // формируем массив мест (без младенцев):
  const departureNotBabySeats = departureOrderList.filter(
    (order) => !order.is_baby
  );

  // формируем массив мест (для младенцев):
  const departureBabySeats = departureOrderList.filter(
    (order) => order.is_baby
  );

  // массив данных с информацией о местах, без учета младенцев:
  const departureSeatsWithoutBabies = departureNotBabySeats.map((seat) => {
    return {
      coach_id: seat.coach_id,
      person_info: seat.is_adult
        ? departureAdultPassengersInfoCopy.pop()
        : departureChildrenPassengersInfoCopy.pop(),
      seat_number: seat.seat_number,
      is_child: seat.is_child,
      include_children_seat: false, // временная заглушка
    };
  });

  // массив данных с информацией о местах, с учетом младенцев:
  const departureSeats = departureSeatsWithoutBabies.map((seat) => {
    // если место зарезервировано за взрослым пассажиром:
    if (seat.is_child === false) {
      departureBabySeats.forEach((babyseat) => {
        // и совпадают вагон и место:
        if (
          babyseat.coach_id === seat.coach_id &&
          babyseat.seat_number === seat.seat_number
        ) {
          seat.include_children_seat = true;
        }
      });
    }
    return seat;
  });

  const departure = {
    route_direction_id: departureRouteDirectionId,
    seats: departureSeats, // список мест с актуальными данными
  };

  if (!arrivalRouteDirectionId) {
    return { user, departure };
  }

  // формируем массив мест (без младенцев):
  const arrivalNotBabySeats = arrivalOrderList.filter(
    (order) => !order.is_baby
  );

  // формируем массив мест (для младенцев):
  const arrivalBabySeats = arrivalOrderList.filter((order) => order.is_baby);

  // массив данных с информацией о местах, без учета младенцев:
  const arrivalSeatsWithoutBabies = arrivalNotBabySeats.map((seat) => {
    return {
      coach_id: seat.coach_id,
      person_info: seat.is_adult
        ? arrivalAdultPassengersInfoCopy.pop()
        : arrivalChildrenPassengersInfoCopy.pop(),
      seat_number: seat.seat_number,
      is_child: seat.is_child,
      include_children_seat: false, // временная заглушка
    };
  });

  // массив данных с информацией о местах, с учетом младенцев:
  const arrivalSeats = arrivalSeatsWithoutBabies.map((seat) => {
    // если место зарезервировано за взрослым пассажиром:
    if (seat.is_child === false) {
      arrivalBabySeats.forEach((babyseat) => {
        // и совпадают вагон и место:
        if (
          babyseat.coach_id === seat.coach_id &&
          babyseat.seat_number === seat.seat_number
        ) {
          seat.include_children_seat = true;
        }
      });
    }
    return seat;
  });

  const arrival = {
    route_direction_id: arrivalRouteDirectionId,
    seats: arrivalSeats, // список мест с актуальными данными
  };

  const result = { user, departure, arrival };

  return result;
};

export default useGetFinalData;
