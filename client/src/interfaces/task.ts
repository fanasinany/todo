export default interface Task {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "INPROGRESS" | "DONE"; // vous pouvez définir une énumération si ces statuts sont utilisés plusieurs fois dans votre code
    assigned: string;
    created: {
        _id: string;
        name: string;
    };
    // createdAt: string;
    // updatedAt: string;
    // __v: number;
}