import { useState, useEffect } from "react";

type MainDishType = {
    title: string,
    description: string,
    imageUrl: string,
    categories: string[],
    ingredients: string[]
       
}

export const MainDish = () => {
    const [mainDish, setmainDish] = useState<MainDishType[]>();
    useEffect(() => {
        fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setmainDish(data)
        });
            
    }, [])
    

 return (
    <>{
           mainDish?.map(dish => (
                <li key={dish.title}>
                    <p>{dish.title}</p>
                </li>
           ))   
   
    }
    </>
 )
};

//Vi kan hämta data från apiet men ImageUrl funkar ej.
//Det är inget fel i datan, utan hur vi försöker implementera det.
//Till Allex: Lägg in alla dbilder och commita det så vi alla får dem i projektet.
