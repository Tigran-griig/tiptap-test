export const cloneDeep = (data:Record<string, unknown>) => JSON.parse(JSON.stringify(data))
export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')
export const mergeObjects = (...args: any) => Object.assign({}, ...args)
