import "./App.css";
import Timecode from "./Classes/Timecode";
import ShowReelComponent from "./Components/ShowReelComponent";

const App = () => {
	const timecode = new Timecode();
	console.log("TimeCode: ", timecode.Duration);

	return (
		<div className="App">
			<h1>Show Reels</h1>
			<ShowReelComponent />
		</div>
	);
};

export default App;
