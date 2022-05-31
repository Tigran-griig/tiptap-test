import React, {Dispatch, SetStateAction} from "react";

export const CommentForm = ({
                                commentText,
                                setCommentText,
                                setComment
                            }: { commentText: string, setCommentText: Dispatch<SetStateAction<string>>, setComment: any }) => {

    return (
        <section className="comment-adder-section bg-white shadow-lg">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText((e.target)?.value as string)}
                    onKeyDown={(e) => {
                        if (e.key === "enter") {
                            e.preventDefault()
                            e.stopPropagation()
                            setComment()
                        }
                    }}
                    cols={30}
                    rows={4}
                    placeholder="Add comment..."
                    className=""
                />

            <section className="flex flex-row w-full gap-1">
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCommentText('' as string)
                    }}>
                    Clear
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setComment()
                    }}
                >
                    Add
                </button>
            </section>
        </section>
    )
}