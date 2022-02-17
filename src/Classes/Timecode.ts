export default class Timecode {
    Start_Timecode: string;
    End_Timecode: string;
    Duration: string;
    Frame: number;

    constructor(endTimecode: string = "00:00:00:00", frame: number = 25) {
        this.Start_Timecode = "00:00:00:00";
        this.End_Timecode = endTimecode;
        this.Frame = frame;
        this.Duration = this.calculateDuration();
    }

    calculateDuration = () => {
        const newDuration = Timecode.FrameToTimeCode(Timecode.TimeCodeToFrame(this.End_Timecode, this.Frame) - Timecode.TimeCodeToFrame(this.Start_Timecode, this.Frame));
        this.Duration = newDuration;
        return newDuration;
    }

    static FrameToTimeCode = (frames: number, frame: number = 25): string => {
        let hhmmss = new Date((frames / frame) * 1000).toISOString().substr(11, 8);
        let remainder = frames % frame;
        let z = n => (n < 10 ? '0' : '') + n;
        return `${hhmmss}:${z(remainder)}`
    }

    static TimeCodeToFrame = (timecode: string, frame: number = 25): number => {
        let f = 0;
        let m = 1;
        var place = timecode.trim().split(':').slice(0, 3);
        while (place.length > 0) {
            f += m * frame * parseInt(place.pop() ?? "0", 10);
            m *= 60;
        }
        var remainderFrame = timecode.trim().split(':').pop();
        f += parseInt(remainderFrame ?? "0");
        return f;
    }
}