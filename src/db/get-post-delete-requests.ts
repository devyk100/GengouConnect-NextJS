import axios from "axios"

export const backendUrl = "http://localhost:8080";
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


export const createFlashcard = async ({token, frontAudioUrl, rearAudioUrl, frontImageUrl, rearImageUrl, frontContent, rearContent, deckId, reviewFactor, reviewInterval}: {token:string, frontAudioUrl:string, rearAudioUrl:string, frontImageUrl:string, rearImageUrl:string, frontContent:string, rearContent:string, deckId:number, reviewFactor:number, reviewInterval:number}) => {
    const data = await axios.post(`${backendUrl}/flashcard/create-card`, {
        frontAudioUrl, rearAudioUrl, frontImageUrl, rearImageUrl, frontContent, rearContent, deckId, reviewFactor, reviewInterval
    }, {
        headers: {
            Authorization: token
        }
    })
    return data.data
}

export const getFlashcardsForDeck = async ({token, deckId}: {token:string,deckId:number}) => {
    const data = await axios.get(`${backendUrl}/flashcard/get-cards/${deckId}-10-0`, {
        headers: {
            Authorization: token as string
        }
    })
    console.log(data, "haha cards")
    return data.data
}