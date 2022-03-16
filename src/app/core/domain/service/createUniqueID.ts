import { v4 as uuid } from 'uuid';

export default function createUniqueID(prefix='') {
    const id = uuid();
    return `${prefix}${id}`
}