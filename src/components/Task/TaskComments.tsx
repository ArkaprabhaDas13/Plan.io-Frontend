import { useEffect, useState } from 'react'
import { getComments, createComment } from '../../api/commentApi'
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store'

interface TaskType {
  createdBy?: string;
  _id: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority?: string;
}

interface CommentProp {
  task: TaskType
}

const TaskComments = ({ task }: CommentProp) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const commentsData = await getComments(task._id);
        setComments(Array.isArray(commentsData.data) ? commentsData.data : []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
    getAllComments();
  }, [task._id])

  const handleClick = async () => {
    if (!commentText.trim()) return;

    try {
      setIsPosting(true);
      const payload = {
        description: commentText,
        taskId: task._id,
        ...(user?._id ? { createdBy: user._id } : {}),
      }

      const commentData = await createComment(payload);
      if (commentData) {
        setComments(prev => [...prev, commentData.data || commentData]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Error creating comment:", err);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comments ({comments.length})
        </h3>
      </div>

      {/* Input box */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
        />
        <button
          onClick={handleClick}
          disabled={isPosting || !commentText.trim()}
          className="shrink-0 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          {isPosting ? 'Posting...' : 'Comment'}
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-3 pt-2">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">No comments yet. Be the first to leave a comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment?._id || index}
              className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4 space-y-1 transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-cyan-400">
                  {comment?.createdBy?.name || comment?.author || 'Team Member'}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{comment?.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskComments