import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addPassengerToList } from "../../redux/passengersSlice";
import addIcon from "../../assets/add.svg";
import "./addPassenger.css";

const AddPassenger: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddPassengersData = () => {
    dispatch(addPassengerToList());
  };

  return (
    <div className="add-passenger">
      <div className="add-passenger__text">Добавить пассажира</div>
      <img
        className="add-passenger__icon"
        src={addIcon}
        alt="Добавить пассажира"
        onClick={handleAddPassengersData}
        aria-label="Добавить пассажира"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleAddPassengersData();
          }
        }}
      />
    </div>
  );
};

export default AddPassenger;
