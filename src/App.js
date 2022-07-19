import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  // POKE APIエンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon/ditto";
  // committest
  // ブラウザがロードされた際に一度だけ呼び出す
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得する
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);

  return <div className="App"></div>;
}

export default App;
