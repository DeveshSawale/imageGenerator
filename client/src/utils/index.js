import {surpriseMePrompts} from "../constants"

export const getRandomDescription = () =>{
    const index = Math.floor(Math.random()*surpriseMePrompts.length)
    const randDescription = surpriseMePrompts[index]
    return randDescription;
}