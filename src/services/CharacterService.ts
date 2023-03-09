import axios from 'axios'
import { Character } from '../types/characters'

interface ResponseCharacters{
    info: {
        count: number
        pages: number
        next: string
        prev: string
    },
    results: Character[]
}

export const getCharacters = async (page?: number) =>{
    let query = ''
    if(page){
        query = `?page=${page}`
    }
    return axios.get<ResponseCharacters>(`https://rickandmortyapi.com/api/character/${query}`)
    .then((response) =>  response.data)
}

export const getCharacter = async (id: number) =>{
    console.log(id)
    return axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) =>  response.data)
}