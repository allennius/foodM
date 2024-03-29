import { Link } from "react-router-dom";
import { MainDishComponent } from "../components/MainDishComponent";
import { Navbar } from "../components/NavbarComponent";

const MenuPage = () => {
  return (
    <>
    
    <Navbar/>
  
      <div>
        <MainDishComponent dishType="mainDish" />
      </div>

      <div>
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/sides">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
