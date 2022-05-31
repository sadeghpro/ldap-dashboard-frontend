export default interface IResponse<T> {
    status: boolean;
    data: T;
}