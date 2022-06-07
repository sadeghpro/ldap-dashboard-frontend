import IErrorResponse from "./IErrorResponse";

export default interface IResponse<T> {
    status: boolean;
    data: T;
    error?: IErrorResponse;
}