import React, {useEffect} from 'react';
import format from "date-fns/format";
import {v4 as uuidv4} from "uuid";
import {Editor} from "@tiptap/core";
import {IProject} from "@/types/interfaces/IProject";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";

const dateTimeFormat = 'dd.MM.yyyy HH:mm';

export interface CommentInstance {
    uuid?: string
    comments?: any[]
}

export const useComment = ({editor, project}: { editor: Editor | null, project: IProject | null }) => {
    const [isCommentModeOn, setIsCommentModeOn] = React.useState<boolean>(false)


    const [commentText, setCommentText] = React.useState('');

    const [showCommentMenu, setShowCommentMenu] = React.useState(false);

    const [isTextSelected, setIsTextSelected] = React.useState(false);

    const [showAddCommentSection, setShowAddCommentSection] = React.useState(true);

    const formatDate = (d: any) => (d ? format(new Date(d), dateTimeFormat) : null);

    const [activeCommentsInstance, setActiveCommentsInstance] = React.useState<CommentInstance>({});

    const [allComments, setAllComments] = React.useState<any[]>([]);


    React.useEffect(((): any => {
        setTimeout(findCommentsAndStoreValues, 100)
    }), []);


    const findCommentsAndStoreValues = () => {
        const proseMirror = document.querySelector('.ProseMirror');

        const comments = proseMirror?.querySelectorAll('span[data-comment]');

        const tempComments: any[] = [];

        if (!comments) {
            setAllComments([])
            return;
        }

        comments.forEach((node, i) => {
            const nodeComments = node.getAttribute('data-comment');
            const jsonComments = nodeComments ? JSON.parse(nodeComments) : null;

            if (jsonComments !== null) {
                tempComments.push({
                    ...node,
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
            let commentPositionNumber = commentsArray?.length ? commentsArray.length + 1 : 1
            const commentData = {
                userName: project?.projectName,
                projectId: project?.id ?? "anonymous_" + uuidv4(),
                projectName: project?.projectName ?? "anonymous",
                time: Date.now(),
                content: commentText,
                positionNumber: commentPositionNumber
            }
            commentsArray.push(commentData);

            const commentWithUuid = JSON.stringify({
                uuid: activeCommentsInstance.uuid || uuidv4(),
                comments: commentsArray,
            });

            // eslint-disable-next-line no-unused-expressions
            editor?.chain().setComment(commentWithUuid).run();
        } else {
            const commentData = {
                userName: project?.projectName,
                projectId: project?.id ?? "anonymous_" + uuidv4(),
                projectName: project?.projectName ?? "anonymous",
                time: Date.now(),
                content: commentText,
                positionNumber: commentsArray?.length ? commentsArray?.length + 1 : 1,
            }
            const commentWithUuid = JSON.stringify({
                uuid: uuidv4(),
                comments: [commentData],
            });

            // eslint-disable-next-line no-unused-expressions
            editor?.chain().setComment(commentWithUuid).run();
        }
        setTimeout(() => setCommentText(''), 50);
    };

    const toggleCommentMode = () => {
        setIsCommentModeOn(!isCommentModeOn)
        if (isCommentModeOn) {
            editor?.setEditable(false);
            editor?.chain().focus().toggleComment().run()
        } else {
            editor?.setEditable(true);
                editor?.chain().focus().toggleComment().run()
        }
    };

    return {
        setCommentText,
        commentText,
        setComment,
        setCurrentComment,
        findCommentsAndStoreValues,
        showAddCommentSection,
        setShowAddCommentSection,
        showCommentMenu,
        setShowCommentMenu,
        toggleCommentMode,
        isCommentModeOn,
        allComments,
        setIsTextSelected,
        isTextSelected,
        activeCommentsInstance,
    };
};

