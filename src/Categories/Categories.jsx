import { FaCar } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { FaCarBattery } from "react-icons/fa6";
import { GiCarSeat } from "react-icons/gi";
import { FaOilCan } from "react-icons/fa";
import './Categories.css';

function Categories({ setCategory }) {
  return (
    <div className="categories">

      <div className="category" onClick={() => setCategory("cars")}>
        <FaCar className="icon" />
        <p>Cars</p>
      </div>

      <div className="category" onClick={() => setCategory("tyres")}>
        <GiCarWheel className="icon" />
        <p>Tyres</p>
      </div>

      <div className="category" onClick={() => setCategory("batteries")}>
        <FaCarBattery className="icon" />
        <p>Batteries</p>
      </div>

      <div className="category" onClick={() => setCategory("seats")}>
        <GiCarSeat className="icon" />
        <p>Seats</p>
      </div>

      <div className="category" onClick={() => setCategory("oil")}>
        <FaOilCan className="icon" />
        <p>Oil</p>
      </div>

    </div>
  );
}

export default Categories;