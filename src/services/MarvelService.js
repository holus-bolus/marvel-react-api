class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=05055e60346d1b1668ad50134bcbabd4";
  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };
  // getAllCharacters = () => {
  //   return this.getResource(
  //     `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
  //   );
  // };
  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    // return this.getResource(
    //     `${this._apiBase}characters/${id}?&${this._apiKey}`
    // );
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?&${this._apiKey}`
    );
    // return this._transformCharacter(res);
    return this._transformCharacter(res.data.results[0]);
  };
  // _transformCharacter = (res) => {
  //   return {
  //     name: res.data.results[0].name,
  //     description: res.data.results[0].description,
  //     thumbnail:
  //       res.data.results[0].thumbnail.path +
  //       "." +
  //       res.data.results[0].thumbnail.extension,
  //     homepage: res.data.results[0].urls[0].url,
  //     wiki: res.data.results[0].urls[1].url,
  //     error: false,
  //   };
  // };
  _transformCharacter = (character) => {
    return {
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
    };
  };
}

export default MarvelService;
