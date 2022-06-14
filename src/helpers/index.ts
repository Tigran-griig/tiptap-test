export const cloneDeep = (data: object | any) => JSON.parse(JSON.stringify(data))
export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')
export const mergeObjects = (...args: any) => Object.assign({}, ...args)
