import Clip from "./Clip";

export default class ShowReel {
    Clips: Clip[];
    Standard: string;
    Definition: string;
    Total: String;

    constructor(standard = "PAL", definition = "SD") {
        this.Clips = [];
        this.Standard = standard;
        this.Definition = definition;
        this.Total = "00:00:00:00";
    }

    AddClip = (clip: Clip): Clip[] | null => {
        // Check if same type and definition
        if (clip.Standard === this.Standard && clip.Definition === this.Definition) {
            this.Clips.push(clip);

            return this.Clips;
        }

        return null;
    }

    RemoveClip = (clip: Clip): Clip | null => {
        if (this.Clips.indexOf(clip) !== -1) {
            this.Clips.splice(this.Clips.indexOf(clip), 1);
            return clip;
        }

        return null;
    }

    
}