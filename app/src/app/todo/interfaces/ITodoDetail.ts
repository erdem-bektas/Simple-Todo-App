import IFileDetail from "./IFileDetail";

export default interface ITodoDetail {
    _id?: string;
    title: string;
    description: string;
    tags: string[];
    files: IFileDetail[];
}
