import React from 'react'
import {mergeObjects, classNames} from '@/helpers'
import defaultClasses from './Block.module.css'

export const Block = ({
  children,
  classes,
  className,
}: {
  children: React.ReactNode
  className?: string
  classes?: string | {[key: string]: string}
}) => {
  const classesMain = mergeObjects(defaultClasses, classes)
  return <div className={classNames(classesMain.root, className ?? '')}>{children}</div>
}
