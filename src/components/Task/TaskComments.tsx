import { useEffect, useState } from 'react'
import { getComments, createComment } from '../../api/commentApi'
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store'


interface TaskType{
    createdBy: string;
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
}

interface CommentProp{
    task: TaskType
}

const TaskComments = ({task}:CommentProp) => {
    const [comments, setComments] = useState<any[]>([]);
    const [commentText, setCommentText] = useState<string>("");
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(()=>{
        const getAllComments = async()=>{
            const commentsData = await getComments(task._id);
            setComments(Array.isArray(commentsData.data) ? commentsData.data : []);
        }
        getAllComments();
    }, [task._id])

    const handleClick = async()=>{
        if (!commentText.trim()) return;

        const payload = {
            description: commentText,
            taskId: task._id,
            ...(user?._id ? { createdBy: user._id } : {}),
        }

        const commentData = await createComment(payload);
        if (commentData) {
            setComments(prev => [...prev, commentData.data]);
            setCommentText("");
        }
    }
  
    return (
        <div>
            <h4>TaskComments:</h4>

            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment"
            />
            <button onClick={handleClick}>create</button>

            {comments.map((comment, index) => (
                <div key={comment?._id || index} style={{border: "1px solid black", marginTop: "8px"}}>
                    <h6>{comment?.description}</h6>
                </div>
            ))}
        </div>
    )
}

export default TaskComments