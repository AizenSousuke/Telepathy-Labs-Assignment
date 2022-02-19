import { Card, Divider, List } from "antd";
import "./App.css";
import ShowReelComponent from "./Components/ShowReelComponent";

const App = () => {
	return (
		<div>
			<h1>Show Reels</h1>
			<ShowReelComponent standard={"PAL"} definition={"HD"} />
			<Divider></Divider>
			<ShowReelComponent standard={"NTSC"} definition={"HD"} />
			<Divider></Divider>
			<ShowReelComponent standard={"PAL"} definition={"SD"} />
			<Divider></Divider>
			<ShowReelComponent standard={"NTSC"} definition={"SD"} />
		</div>
	);
};

export default App;
