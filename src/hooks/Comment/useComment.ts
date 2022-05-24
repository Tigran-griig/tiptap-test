import React, { useEffect } from 'react';
import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@tiptap/core";
import { IProject } from "@/types/interfaces/IProject";
import { IComment } from "@/types/interfaces/IComment";

const dateTimeFormat = 'dd.MM.yyyy HH:mm';

interface CommentInstance {
  uuid?: string
  comments?: IComment[]
}

export const useComment = ({ editor, project }: { editor: Editor | null, project: IProject | null }) => {
  const [isCommentModeOn, setIsCommentModeOn] = React.useState<boolean>(false)

  const [commentText, setCommentText] = React.useState<string>('');

  const [showCommentMenu, setShowCommentMenu] = React.useState(false);

  const [isTextSelected, setIsTextSelected] = React.useState<boolean>(false);

  const [showAddCommentSection, setShowAddCommentSection] = React.useState(false);

  const formatDate = (d: any) => (d ? format(new Date(d), dateTimeFormat) : null);
  const [activeCommentsInstance, setActiveCommentsInstance] = React.useState<CommentInstance>({});
  const [allComments, setAllComments] = React.useState<any[]>([]);
  React.useEffect((): any => {
    setTimeout(findCommentsAndStoreValues, 100)
  }, []);

  const findCommentsAndStoreValues = () => {
    const proseMirror = document.querySelector('.ProseMirror');

    const comments = proseMirror?.querySelectorAll('span[data-comment]');

    const tempComments: any[] = [];

    if (!comments) {
      setAllComments([])
      return;
    }

    comments.forEach((node) => {
      const nodeComments = node.getAttribute('data-comment');

      const jsonComments = nodeComments ? JSON.parse(nodeComments) : null;

      if (jsonComments !== null) {
        tempComments.push({
          node,
          jsonComments,
        });
      }
    });

    setAllComments(tempComments)
  };
  const setCurrentComment = (editor: any) => {
    const newVal = editor.isActive('comment');

    if (newVal) {
      setTimeout(() => setShowCommentMenu(newVal), 50);

      setShowAddCommentSection(!editor.state.selection.empty)

      const parsedComment = JSON.parse(editor.getAttributes('comment').comment);

      parsedComment.comment = typeof parsedComment.comments === 'string' ? JSON.parse(parsedComment.comments) : parsedComment.comments;

      setActiveCommentsInstance(parsedComment)
    } else {
      setActiveCommentsInstance({})
    }
  };

  const setComment = () => {
    if (!commentText.trim().length) return;

    const activeCommentInstance: CommentInstance = JSON.parse(JSON.stringify(activeCommentsInstance));

    const commentsArray = typeof activeCommentInstance.comments === 'string' ? JSON.parse(activeCommentInstance.comments) : activeCommentInstance.comments;

    if (commentsArray) {
      commentsArray.push({
        projectId: project?.id ?? "anonymous",
        projectName: project?.projectName ?? "anonymous",
        time: Date.now(),
        content: commentText,
      });

      const commentWithUuid = JSON.stringify({
        uuid: activeCommentsInstance.uuid || uuidv4(),
        comments: commentsArray,
      });
      editor?.chain().setTextSelection(6).run()
      editor?.chain().setComment(commentWithUuid).run();
    } else {
      const commentWithUuid = JSON.stringify({
        id: uuidv4(),
        comments: [{
          projectId: project?.id ?? "anonymous",
          projectName: project?.projectName ?? "anonymous",
          time: Date.now(),
          content: commentText,
        }],
      });
      editor?.chain().setComment(commentWithUuid).run();
    }

    setTimeout(() => setCommentText(''), 50);
  };


  const toggleCommentMode = () => {
    setIsCommentModeOn(!isCommentModeOn)
    if (isCommentModeOn) {
      editor?.setEditable(false);
    } else {
      editor?.setEditable(true);
      editor?.chain().focus().run()
    }
  };


  return {
    setCommentText,
    commentText,
    setComment,
    setCurrentComment,
    findCommentsAndStoreValues,
    showAddCommentSection,
    isCommentModeOn,
    setIsCommentModeOn,
    isTextSelected,
    setShowAddCommentSection,
    showCommentMenu,
    setShowCommentMenu,
    activeCommentsInstance,
    toggleCommentMode,
    setIsTextSelected,
    allComments,
  };
};

