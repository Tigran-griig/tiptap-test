import React from 'react'
import {mergeObjects, classNames} from '@/helpers'
import defaultClasses from './Block.module.css'

export const Block = (props: {
  children: React.ReactNode
  className?: string
  classes?: string | {[key: string]: string}
}) => {
  const classes = mergeObjects(defaultClasses, props.classes)
  return <div className={classNames(classes.root, props.className ?? '')}>{props.children}</div>
}
