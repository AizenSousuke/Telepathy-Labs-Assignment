import React, { useState } from "react";

export const ShowReelComponent = (props) => {
	const [clips, setClips] = useState([]);

    

	return (
		<>
			<h2>Show Reel Component</h2>
            <div>
                {clips.map(clip => {
                    return <>
                        {JSON.stringify(clip)}
                    </>
                })}
            </div>
		</>
	);
};

export default ShowReelComponent;
