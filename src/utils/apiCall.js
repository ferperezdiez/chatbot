import axios from "axios";


const baseUrl = process.env.REACT_APP_BASE_URL


export const getData = async (input) => {
    const token = localStorage.getItem('key')
    try{
        const response = await axios.post(`${baseUrl}/request`, ({
            question: input,
            token
        }), {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
             }
        }) 
        return response.data
    }
    catch(err){ console.log(err) }
}

export const register = async (email, company) => {
    try{
        const response = await axios.post(`${baseUrl}/key`, {email, company})
        return response.data
    }
    catch(err){ console.log(err) }
}

export const login = async (key) => {
    
    console.log("d", `${baseUrl}/login?key=${key}`)
    try{
        const response = await axios.get(`${baseUrl}/login?key=${key}`)
        return response.data
    }
    catch(err){ console.log(err) }
}

