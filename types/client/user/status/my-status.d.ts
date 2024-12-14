interface MyStatusPropsInterface {
    statusArray: Array<MyStatusObjectInterface>;
}
interface MyStatusObjectInterface {
    _id: number;
    statusContent: string;
    bgColor:string
}