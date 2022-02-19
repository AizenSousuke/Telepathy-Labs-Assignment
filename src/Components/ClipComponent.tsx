import { Card, Button, Col } from "antd";

export const ClipComponent = (props) => {
	return (
		<Col flex="500px">
			<Card title={props.name} className="clip" bordered>
				<p>{props.description}</p>
				<Button
					type={"primary"}
					style={{ backgroundColor: "red", color: "white" }}
					onClick={() => props.delete()}
				>
					Remove
				</Button>
			</Card>
		</Col>
	);
};

export default ClipComponent;
