//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//create your first component
export class FetchingExample extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			songSelected: null,
			position: null
		};
		this.audioRef = React.createRef();
		this.cambiarcancion = this.cambiarcancion.bind(this);
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ songs: data });
			});
		// console.log(this.fetchData);
	}
	cambiarcancion(song, index) {
		this.setState({ songSelected: song, position: index });

		// this.setState({ position: index });
		this.audioRef.current.src =
			"https://assets.breatheco.de/apis/sound/" + song.url;
	}
	// adelante(song) {
	// 	this.setState({ songFoward: song });
	// 	this.audioRef.current.src =
	// 		"https://assets.breatheco.de/apis/sound/" + song.url;
	// }
	// play = i => {
	// 	var url = this.state.songs[i].url;
	// 	const songUrl = "https://assets.breatheco.de/apis/sound/" + url;
	// 	this.audio.src = songUrl;
	// 	this.audio.play();
	// 	this.setState({ currentIndex: i });
	// };

	// atras(song) {
	// 	this.setState({ songBefore: song });
	// 	this.audioRef.current.src =
	// 		"https://assets.breatheco.de/apis/sound/" + song.url;
	// }
	render() {
		return (
			<div className="image-box">
				<h1>Music Player React</h1>
				<div>
					{this.state.songs.map((song, i) => {
						return (
							<button
								className="btn btn-secondary btn-lg btn-block  "
								key={i}
								onClick={() => {
									this.cambiarcancion(song, i);
								}}>
								{" "}
								{i} {song.name}{" "}
							</button>
						);
					})}
					<audio
						controls
						autoPlay
						ref={this.audioRef}
						className="audio"
						id="player"></audio>
					<div className="center">
						<button
							className="fas fa-caret-left"
							onClick={() => {
								if (this.state.position - 1 >= 0) {
									this.cambiarcancion(
										this.state.songs[
											this.state.position - 1
										],
										this.state.position - 1 // Faltaba el - 1 para pasarle la position nueva
									);
								}
							}}></button>
						<button
							className="fas fa-caret-right"
							onClick={() => {
								if (
									this.state.position + 1 <
									this.state.songs.length
								) {
									this.cambiarcancion(
										this.state.songs[
											this.state.position + 1
										],
										this.state.position + 1 // Faltaba el + 1 para pasarle la position nueva
									);
								}
							}}></button>
					</div>
				</div>
			</div>
			// <div>
			//     <button>
			//         <label>sonido</label>
			//         <audio>
			//             <source src="horse.ogg" type="audio/ogg"></source>
			//             <source src="horse.mp3" type="audio/mpeg"></source>
			//         </audio>
			//     </button>
			// </div>
		);
	}
}
