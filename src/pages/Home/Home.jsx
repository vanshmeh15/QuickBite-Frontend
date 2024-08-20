import AppDownload from "../../components/AppDownload/AppDownload";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import ExploreMenu from "../../components/exploremenu/ExploreMenu";
import Header from "../../components/header/Header";
import "./Home.css";
import React, { useState } from "react";
export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  );
}
