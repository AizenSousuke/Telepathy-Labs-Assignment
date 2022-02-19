import { Button, Card, Drawer, Modal, notification, Row, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import Clip from "../Classes/Clip";
import Timecode from "../Classes/Timecode";
import data from "../Data/data.json";
import ClipComponent from "./ClipComponent";

export const ShowReelComponent = ({ standard, definition }) => {
	const [clips, setClips] = useState<Clip[]>([]);
	const [drawer, setDrawer] = useState(false);
	// const [alert, setAlert] = useState<string[]>([]);
	const [alert, setAlert] = useState(false);
	const [total, setTotal] = useState("00:00:00:00");
	const ClipItem = (clip: Clip) => {
		return (
			<ClipComponent
				name={clip.Name}
				description={clip.Description}
				delete={() => removeClipFromShowReel(clip)}
			/>
		);
	};

	const showDrawer = () => {
		setDrawer(true);
	};

	const hideDrawer = () => {
		setDrawer(false);
	};

	const showModal = () => {
		setAlert(true);
	};

	const addClipToShowReel = (clip: Clip) => {
		if (clip.Standard === standard && clip.Definition === definition) {
			if (clips.indexOf(clip) === -1) {
				var newValue: Clip[] = [...clips, clip];
				setClips(newValue);
				setTotal(calculateTotal(newValue));
			} else {
				notification["error"]({
					message: "Clip is already in the show reel",
				});
			}
			hideDrawer();
		} else {
			showModal();
		}
	};

	const removeClipFromShowReel = (clip: Clip) => {
		var newValue: Clip[] = [...clips.filter((c) => c !== clip)];
		setClips(newValue);
		setTotal(calculateTotal(newValue));
	};

	const calculateTotal = (clips: Clip[]): string => {
		var total: string = "00:00:00:00";
		clips.forEach((c) => {
			var timecode: Timecode = new Timecode(
				c.End_Timecode,
				c.Standard === "PAL" ? 25 : 30
			);

			total = Timecode.AddTimecode(
				total,
				timecode.calculateDuration(),
				c.Standard === "PAL" ? 25 : 30
			);
		});

		return total;
	};

	return (
		<div className="showreel">
			<h2>
				Show Reel for {standard} {definition}
			</h2>
			<Tag color="black" className="tag">
				Total Time: {total}
			</Tag>
			<Card className="showreel-item">
				<Row justify="start">
					{clips.map((clip) => {
						return ClipItem(clip);
					})}
				</Row>
			</Card>
			<Button type={"primary"} onClick={showDrawer}>
				Show Clip Drawer
			</Button>
			<Drawer
				title="Clips"
				placement={"right"}
				onClose={hideDrawer}
				visible={drawer}
			>
				{data.Clips.map((clip) => (
					<Card className="card" title={clip.Name}>
						<Meta description={clip.Description} />
						<p>
							Standard: {clip.Standard} | Definition:{" "}
							{clip.Definition}
						</p>
						<Button
							type={"primary"}
							onClick={() => addClipToShowReel(clip)}
							style={{ marginBottom: 10 }}
						>
							Add to Showreel
						</Button>
					</Card>
				))}
				<Modal
					title="Error"
					visible={alert}
					onOk={() => setAlert(false)}
					onCancel={() => setAlert(false)}
				>
					You can only add the clips which are of the same definition
					and standard.
				</Modal>
			</Drawer>
		</div>
	);
};

export default ShowReelComponent;
