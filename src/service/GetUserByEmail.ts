const GetUserByEmail = async (email: string, token: string) => {

    const url: string = `http://localhost:7070/jdshop/users/email/${email}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 'Accept': 'application/json',
            Authorization: token,
        }
    }).then((results) => results.json())

    return response;


};

export default GetUserByEmail;
