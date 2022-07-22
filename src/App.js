import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";

function App() {
  // POKE APIエンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  // committest
  // ブラウザがロードされた際に一度だけ呼び出す
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setLoading(false); // データ取得できたためloadingは必要ないためfalseにする
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      // map関数で配列dataのデータを一つずつ取り出す
      data.map((pokemon) => {
        // console.log(pokemon.url);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
