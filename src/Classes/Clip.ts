export default class Clip {
    Name: string;
    Description: string;
    Standard: string;
    Definition: string;
    Start_Timecode: string;
    End_Timecode: string;

    constructor(name: string, description: string, standard: string, definition: string, start_timecode: string, end_timecode: string) {
        this.Name = name ?? "";
        this.Description = description ?? "";
        this.Standard = standard ?? "";
        this.Definition = definition ?? "";
        this.Start_Timecode = start_timecode ?? "";
        this.End_Timecode = end_timecode ?? "";
    }
}