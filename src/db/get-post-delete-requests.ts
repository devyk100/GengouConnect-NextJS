import axios from "axios"

const backendUrl = "http://localhost:8080";
console.log(backendUrl)
export const getDecks = async ({token}: {
    token: string
}) => {
    const data = await axios.get(`${backendUrl}/flashcard/get-decks`, {
        headers: {  
            Authorization: token
        }
    })
    return data.data;
}

export const createDeck = async ({token, title}: {
    token: string;
    title: string;
}) => {
    const data = await axios.post(`${backendUrl}/flashcard/create-deck`, {
        title: title,
        graduatingInterval: 0,
        learningSteps: "",
        newCardsLimitPerDay: 0,
        easyInterval:0
    }, {
        headers: {
            Authorization: token
        }
    })
    return data.data;
}