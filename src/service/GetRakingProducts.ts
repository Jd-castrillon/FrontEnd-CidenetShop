export const GetRankingProducts = async () => {
    
    const response = await fetch("http://localhost:7070/jdshop/products/ranking").then((results) => results.json())

    return response;

}