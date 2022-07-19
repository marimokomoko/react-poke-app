export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // fetch1でポケモンデータを取得(AppjsのinitialURLを取得する)
    fetch(url)
      // JSON形式で返す
      .then((res) => res.json())
      // dataとして受け取り、resolveで呼び出し元にdataを返す
      .then((data) => resolve(data));
  });
};
