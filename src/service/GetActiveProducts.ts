
const GetActiveProducts = async(url: string) => {
    const res = await fetch(url).then((res) => res.json());

    return res;
};


export default GetActiveProducts