import Clip from "../Classes/Clip";
import ShowReel from "../Classes/ShowReel";
import Timecode from "../Classes/Timecode";
import clipData from "../Data/data.json";

describe("ShowReel", () => {

    test('should be created properly', () => {
        var showReel = new ShowReel();

        expect(showReel).toBeTruthy();
        expect(showReel.Clips).toEqual([]);
    });

    test('should not add different Standard or Definition of a clip into the showreel', () => {
        var showReel = new ShowReel();
        var clip = new Clip(clipData.Clips[0].Name, clipData.Clips[0].Description, clipData.Clips[0].Standard, clipData.Clips[0].Definition, clipData.Clips[0].Start_Timecode, clipData.Clips[0].End_Timecode);
        var clip2 = new Clip(clipData.Clips[1].Name, clipData.Clips[1].Description, clipData.Clips[1].Standard, clipData.Clips[1].Definition, clipData.Clips[1].Start_Timecode, clipData.Clips[1].End_Timecode);

        showReel.AddClip(clip);
        showReel.AddClip(clip2);

        expect(showReel.Clips.length).toEqual(1);
    });

    test('should not add the same Standard and Definition of a clip into the showreel', () => {
        var showReel = new ShowReel();
        var clip = new Clip(clipData.Clips[0].Name, clipData.Clips[0].Description, clipData.Clips[0].Standard, clipData.Clips[0].Definition, clipData.Clips[0].Start_Timecode, clipData.Clips[0].End_Timecode);
        var clip2 = new Clip(clipData.Clips[2].Name, clipData.Clips[2].Description, clipData.Clips[2].Standard, clipData.Clips[2].Definition, clipData.Clips[2].Start_Timecode, clipData.Clips[2].End_Timecode);

        showReel.AddClip(clip);
        showReel.AddClip(clip2);

        expect(showReel.Clips.length).toEqual(2);
    });

    test('should return the correct duration for all NTSC SD Videos', () => {
        var showReel = new ShowReel("NTSC", "SD");
        var clip1 = new Clip(clipData.Clips[1].Name, clipData.Clips[1].Description, clipData.Clips[1].Standard, clipData.Clips[1].Definition, clipData.Clips[1].Start_Timecode, clipData.Clips[1].End_Timecode);
        var clip4 = new Clip(clipData.Clips[4].Name, clipData.Clips[4].Description, clipData.Clips[4].Standard, clipData.Clips[4].Definition, clipData.Clips[4].Start_Timecode, clipData.Clips[4].End_Timecode);
        var clip5 = new Clip(clipData.Clips[5].Name, clipData.Clips[5].Description, clipData.Clips[5].Standard, clipData.Clips[5].Definition, clipData.Clips[5].Start_Timecode, clipData.Clips[5].End_Timecode);

        showReel.AddClip(clip1);
        showReel.AddClip(clip4);
        showReel.AddClip(clip5);
        var frames = 0;
        showReel.Clips.forEach(clip => {
            frames += Timecode.TimeCodeToFrame(clip.End_Timecode, 30);
        });

        expect(showReel.Clips.length).toEqual(3);
        expect(Timecode.FrameToTimeCode(frames, 30)).toEqual("00:00:54:08");
    });

    test('should return the correct duration for all PAL SD Videos', () => {
        var showReel = new ShowReel("PAL", "SD");
        var clip0 = new Clip(clipData.Clips[0].Name, clipData.Clips[0].Description, clipData.Clips[0].Standard, clipData.Clips[0].Definition, clipData.Clips[0].Start_Timecode, clipData.Clips[0].End_Timecode);
        var clip2 = new Clip(clipData.Clips[2].Name, clipData.Clips[2].Description, clipData.Clips[2].Standard, clipData.Clips[2].Definition, clipData.Clips[2].Start_Timecode, clipData.Clips[2].End_Timecode);
        var clip3 = new Clip(clipData.Clips[3].Name, clipData.Clips[3].Description, clipData.Clips[3].Standard, clipData.Clips[3].Definition, clipData.Clips[3].Start_Timecode, clipData.Clips[3].End_Timecode);
        
        showReel.AddClip(clip0);
        showReel.AddClip(clip2);
        showReel.AddClip(clip3);
        var frames = 0;
        showReel.Clips.forEach(clip => {
            frames += Timecode.TimeCodeToFrame(clip.End_Timecode, 25);
        });

        expect(showReel.Clips.length).toEqual(3);
        expect(Timecode.FrameToTimeCode(frames, 25)).toEqual("00:02:11:01");
    });

})

