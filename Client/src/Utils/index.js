import { surpriseMePrompts } from '../Constants'
import FileSaver from 'file-saver'

export function getRandomPrompt (prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPromopt = surpriseMePrompts[randomIndex]

    if (randomPromopt === prompt) {
        return getRandomPrompt(prompt)
    }

    return randomPromopt
}

export async function downloadImage (_id, photo) {
    FileSaver.saveAs(photo,`download-${_id}.jpg` );
}