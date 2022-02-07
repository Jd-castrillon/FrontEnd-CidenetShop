
 export const login = async (userName:string,
  password:string) => {
  const response = await fetch("http://localhost:7070/jdshop/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      userName,
      password,
    }),
  }).then((results) => results.json())

  return response;

  }


