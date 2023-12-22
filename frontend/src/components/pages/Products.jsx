import React from "react";
import '../../App.css';
import CardsProducts from "../CardsProducts";
import Footer from "../Footer";


export default function Products(){
    return ( 
    <>
    <h1 className="products"> PRODUKTY </h1>;
    <CardsProducts/>
    <Footer/>
    </>
    );

}