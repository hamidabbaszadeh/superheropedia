import md5 from 'md5';
import { CharacterDataWrapper } from '../types/marvels';

const API_BASE_URL = "https://gateway.marvel.com/v1/public";
const API_PUBLIC_KEY = "0380d7cce4c53d540b76d0a34883768f";
const API_PRIVATE_KEY = "acd5075044b895617a48e88bb9778843d5e02459";

const getTimeStamp = () => Date.now().toString();
const getHash = (ts: string) => md5(ts+API_PRIVATE_KEY+API_PUBLIC_KEY);

const timeStamp = getTimeStamp();
const hash = getHash(timeStamp);
const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

const handleResponse = async <T>(response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json();
    return data.data as T;
}

export const getCharacters = async () => {
    const url = `${API_BASE_URL}/characters?${query}`;
    const response = await fetch(url);
    return handleResponse<CharacterDataWrapper>(response);
}

export const detailCharacters = async (characterId: string) => {
    const url = `${API_BASE_URL}/characters/${characterId}?${query}`;
    const response = await fetch(url);
    return handleResponse<CharacterDataWrapper>(response);
}