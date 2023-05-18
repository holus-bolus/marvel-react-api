import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  // state = {
  //   name: null,
  //   description: null,
  //   thumbnail: null,
  //   homepage: null,
  //   wiki: null,
  //   error: false,
  // };
  marvelService = new MarvelService();

  componentDidMount() {
    console.log("Mounting");
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 5000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Updating");
  }

  componentWillUnmount() {
    console.log("Unmounting");
    clearInterval(this.timerId);
  }

  // constructor(props) {
  //   super(props);
  //   // this.updateChar();
  //   // setInterval(this.updateChar, 5000);
  // }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  updateChar = () => {
    // const id = 1011005;
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
    //   this.marvelService.getAllCharacters().then((res) => {
    //     console.log(res);
    //   });
    // };
    // this.marvelService.getCharacter(id).then((res) => {
    //   this.setState(res);
    // });
  };
  // name: res.data.results[0].name,
  // description: res.data.results[0].description,
  // thumbnail:
  //   res.data.results[0].thumbnail.path +
  //   "." +
  //   res.data.results[0].thumbnail.extension,
  // homepage: res.data.results[0].urls[0].url,
  // wiki: res.data.results[0].urls[1].url,
  // error: false,
  // }
  // )
  // )
  //     ;
  // };

  render() {
    // const { name, description, thumbnail, homepage, wiki, error } = this.state;
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        {/*{loading ? <Spinner /> : <View char={char} />}*/}
        {/*<div className="randomchar__block">*/}
        {/*  <img*/}
        {/*    src={thumbnail}*/}
        {/*    alt="Random character"*/}
        {/*    className="randomchar__img"*/}
        {/*  />*/}
        {/*  <div className="randomchar__info">*/}
        {/*    <p className="randomchar__name">{name}</p>*/}
        {/*    <p className="randomchar__descr">{description}</p>*/}
        {/*    <div className="randomchar__btns">*/}
        {/*      <a href={homepage} className="button button__main">*/}
        {/*        <div className="inner">homepage</div>*/}
        {/*      </a>*/}
        {/*      <a href={wiki} className="button button__secondary">*/}
        {/*        <div className="inner">Wiki</div>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
