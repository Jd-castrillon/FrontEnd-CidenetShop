

export type AuthUserType = {
    token:string;
    userName:string;
    authorities: authority[]
}
export type authority = {
    authority : string
}