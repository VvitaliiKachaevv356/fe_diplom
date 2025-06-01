export interface ITown {
  _id: string;
  name: string;
}

export interface ISearchParams {
  from_city_id: string;
  to_city_id: string;

  date_start: string;
  date_end: string;

  minPrice?: number;
  maxPrice?: number;

  startDepartureHourFrom?: number;
  startDepartureHourTo?: number;

  endDepartureHourFrom?: number;
  endDepartureHourTo?: number;

  startArrivalHourFrom?: number;
  startArrivalHourTo?: number;

  endArrivalHourFrom?: number;
  endArrivalHourTo?: number;

  firstClass?: boolean;
  secondClass?: boolean;
  thirdClass?: boolean;
  fourthClass?: boolean;

  wifi?: boolean;
  express?: boolean;
}

export interface ITrain {
  // город прибытия:
  arrival?: {
    _id: string;

    available_seats: number;
    available_seats_info: {
      first?: number;
      second?: number;
      third?: number;
      fourth?: number;
    };

    duration: number;

    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;

    is_express: boolean;

    min_price: number;

    // стоимость мест по классам:
    price_info: {
      first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
      };
      second?: {
        top_price?: number;
        bottom_price?: number;
      };
      third?: {
        top_price?: number;
        bottom_price?: number;
        side_price?: number;
      };
      fourth?: {
        top_price?: number;
        bottom_price?: number;
      };
    };

    // город отправления:
    from: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    // город прибытия:
    to: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    // название поезда:
    train: {
      _id: string;
      name: string;
    };
  };

  // количество свободных мест:
  available_seats: number;

  // распределение мест по вагонам:
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };

  // город отправления:
  departure: {
    _id: string;

    available_seats: number;
    available_seats_info: {
      first?: number;
      second?: number;
      third?: number;
      fourth?: number;
    };

    duration: number;

    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;

    is_express: boolean;

    min_price: number;

    // стоимость мест по классам:
    price_info: {
      first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
      };
      second?: {
        top_price?: number;
        bottom_price?: number;
      };
      third?: {
        top_price?: number;
        bottom_price?: number;
        side_price?: number;
      };
      fourth?: {
        top_price?: number;
        bottom_price?: number;
      };
    };

    // город отправления:
    from: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    // город прибытия:
    to: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    // название поезда:
    train: {
      _id: string;
      name: string;
    };
  };

  // наличие опций:
  have_air_conditioning: boolean;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;

  // экспресс:
  is_express: boolean;

  // минимальная стоимость:
  min_price: number;
}

export interface ICarriage {
  coach: {
    _id: string;
    carriage_number: number; // номер вагона - сгенерирован самостоятельно!!!
    top: number; // количество верхних мест в вагоне - сгенерировано самостоятельно!!!
    bottom: number; // количество нижних мест в вагоне - сгенерировано самостоятельно!!!
    side: number; // количество боковых мест в вагоне - сгенерировано самостоятельно!!!
    name: string;
    class_type: string; // класс вагона - 'first', 'second', 'third' или 'fourth'
    have_wifi: true; // наличие Wi-Fi в вагоне
    have_air_conditioning: false; // наличие кондиционера в вагоне
    price: number; // стоимость места в вагоне класс 'first' - люкс
    top_price: number; // стоимость верхнего места - вагоны классов 'second', 'third' и 'fourth'
    bottom_price: number; // стоимость нижнего места - вагоны классов 'second', 'third' и 'fourth'
    side_price: number; // стоимость бокового места в вагоне класс 'third' - платцкарт
    linens_price: number; // стоимость постельного белья
    wifi_price: number; // стоимость Wi-Fi
    is_linens_included: true; // стоимость белья включена в стоимость (и не может быть исключена)
    available_seats: number; // количество доступных мест в вагоне
    train: string;
  };
  seats: { index: number; available: boolean; isActive: boolean }[]; // массив - сгенерирован заново самостоятельно!!!
}

export interface IMyCarriageProps {
  isForward: boolean;
  _id: string;
  adults: { count: number; isActive: boolean };
  children: { count: number; isActive: boolean };
  baby: { count: number; isActive: boolean };
  currentSeats: { index: number; available: boolean; isActive: boolean }[];
  carriage_number: number;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  have_wifi: boolean;
  wiFiPrice: number;
  is_linens_included: boolean;
  linensPrice: number;
  onSeatClick: (seatIndex: number, price: number, isChecked: boolean) => void;
}

export interface IOrder {
  coach_id: string;
  seat_number: number;

  is_adult: boolean;
  is_child: boolean;
  is_baby: boolean;

  total_price: number;
}

export interface IPassenger {
  type: string; // взрослый, ребенок или младенец
  lastName: { value: string; isValid: boolean; hasError: boolean }; // фамилия
  firstName: { value: string; isValid: boolean; hasError: boolean }; // имя
  middleName: { value: string; isValid: boolean; hasError: boolean }; // отчество
  gender: boolean; // пол: true - для 'male', false - для 'female'
  birthdate: { value: string; isValid: boolean; hasError: boolean }; // дата рождения
  limitedMobility: boolean; // наличие инвалидности
  document: string; // типа документа - паспорт или свидетельство о рождении
  passportSeries: { value: string; isValid: boolean; hasError: boolean }; // серия паспорта
  passportNumber: { value: string; isValid: boolean; hasError: boolean }; // номер паспорта
  certificateNumber: { value: string; isValid: boolean; hasError: boolean }; // номер свидетельства
}
