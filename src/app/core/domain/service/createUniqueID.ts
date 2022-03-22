import { nanoid } from 'nanoid'

export default function createUniqueID(prefix='') {
    const id = nanoid(4);
    return `${prefix}-${id}`
}