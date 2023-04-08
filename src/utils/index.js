import {surpriseMePrompts} from "../constants"
import FileSaver from 'file-saver'

export const getRandomDescription = () =>{
    const index = Math.floor(Math.random()*surpriseMePrompts.length)
    const randDescription = surpriseMePrompts[index]
    return randDescription;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
