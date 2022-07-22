import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Naber from "./components/Nabver/Nabver";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";

function App() {
  // POKE APIエンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  // ブラウザがロードされた際に一度だけ呼び出す
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous); // 最初はnullに格納されている
      setLoading(false); // データ取得後はloadingは必要ないためfalseにする
    };
    fetchPokemonData();
  }, []);

  // ポケモンデータを取得
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      // map関数で配列dataのデータを一つずつ取り出す
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // 前へボタン押下
  const handlePrevPage = async () => {
    if (!prevURL) return; // 最初はnullなので後続処理は行わない
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // 次へボタン押下
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Naber />
      <div className="App">
        {loading ? (
          <h1>Now Loading...</h1>
        ) : (
          <>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
