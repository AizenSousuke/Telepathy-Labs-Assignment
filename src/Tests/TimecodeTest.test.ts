import Timecode from "../Classes/Timecode";

describe("Timecode", () => {

    test('should be created with the proper default values', () => {
        // Arrange
        let timecode = new Timecode();

        // Act


        // Assert
        expect(timecode.Start_Timecode).toEqual("00:00:00:00");
        expect(timecode.End_Timecode).toEqual("00:00:00:00");
        expect(timecode.Duration).toEqual("00:00:00:00");
    });

    test('should return correct End_Timecode and Duration when changed through the constructor', () => {
        let timecode = new Timecode("00:20:12:00");

        expect(timecode.End_Timecode).toEqual("00:20:12:00");
        expect(timecode.Duration).toEqual("00:20:12:00");
    });

    test('should return the correct duration', () => {
        let timecode = new Timecode("00:00:10:01");

        timecode.Start_Timecode = "00:00:00:01";
        timecode.calculateDuration();

        expect(timecode.Duration).toEqual("00:00:10:00");
    });

    test('should return correct timecode based on frames', () => {
        let timecode = new Timecode();
        timecode.End_Timecode = "00:00:10:00";
        timecode.calculateDuration();

        expect(Timecode.FrameToTimeCode(60, 30)).toEqual("00:00:02:00");
    });

    test('should return correct frame based on timecode', () => {
        let timecode = new Timecode();
        timecode.End_Timecode = "00:00:10:20";
        timecode.calculateDuration();

        expect(timecode.Duration).toEqual("00:00:10:20");
        expect(Timecode.TimeCodeToFrame(timecode.Duration, 30)).toEqual(320);
    });
})