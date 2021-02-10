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
			songSelected: null
		};
		this.audioRef = React.createRef();
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ songs: data });
				console.log(this.state.songs);
			});
		// console.log(this.fetchData);
	}
	cambiarcancion(song) {
		this.setState({ songSelected: song });
		console.log(this.audioRef);
		this.audioRef.current.src =
			"https://assets.breatheco.de/apis/sound/" + song.url;
	}
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
									this.cambiarcancion(song);
								}}>
								{" "}
								{i} {song.name}{" "}
							</button>
						);
					})}
					<audio controls ref={this.audioRef}></audio>
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
