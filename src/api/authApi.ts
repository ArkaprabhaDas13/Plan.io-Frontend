export const registerApi = async (name: string, email: string, password: string) => {
    const url = "http://localhost:3000/api/auth/register/"
    const payload = {
      name: name,
      email: email,
      password: password
    }
    const response = await fetch(url, {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(payload)
    })

    return response.json();
}

export const loginApi = async (email: string, password: string) => {
    const url = "http://localhost:3000/api/auth/login/"
    const payload = {
        email: email,
        password: password
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    return response.json();
}

export const getUserDetails = async (token)=>{
    const url = "http://localhost:3000/api/auth/aboutme"
    const response = await fetch(url, {
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}