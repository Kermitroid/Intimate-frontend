import { useEffect, useState } from 'react';
import {
  getCommentsByVideoId,
  postComment,
  likeComment,
  unlikeComment,
  replyToComment,
} from '../../lib/api/comments';

interface Props {
  videoId: string;
}

const CommentsSection = ({ videoId }: Props) => {
  const [comments, setComments]
  const [likes, setLikes] = useState({}); = useState([]);
  const [text, setText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

  const fetchComments = async () => {
    try {
      const data = await getCommentsByVideoId(videoId);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    setSubmitting(true);
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await postComment(videoId, text);
      setText("");
      setSubmitting(false);
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
      setError("Failed to post comment. Please try again.")
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    setError("");
    const content = replies[parentId];
    if (!content?.trim()) return;
    try {
      await replyToComment(parentId, content);
      setReplies({ ...replies, [parentId]: "" });
      setReplyingTo(null);
      fetchComments();
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  const toggleLike = async (commentId: string, liked: boolean) => {
    try {
      liked ? await unlikeComment(commentId) : await likeComment(commentId);
      fetchComments();
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // removed old renderReplies - using recursive renderComment now
    const children = comments.filter(c => c.parentComment === parentId);
    return children.map(c => {
      <div key={c._id} className="ml-6 mt-2 border-l pl-4">
        <p className="text-sm text-gray-700">{c.content}</p>
        <p className="text-xs text-gray-400">By {c.creator?.username || "Anonymous"} on {new Date(c.createdAt).toLocaleDateString()}</p>
        <button
          onClick={() => toggleLike(c._id, c.likedByCurrentUser)}
          className={`text-sm mt-1 ${c.likedByCurrentUser ? "text-blue-600" : "text-gray-500"}`}
        >
          {c.likedByCurrentUser ? "Unlike" : "Like"} {c.likesCount || 0}
        </button>
        
      </div>
    ));
  };

  
  const renderComment = (comment: any, level = 0) => {
    const children = comments.filter(c => c.parentComment === comment._id);
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="border-l-2 border-gray-300 pl-4 ml-2">
    <div className="overflow-x-hidden">
      <div key={comment._id} className={`ml-${level * 4} mt-2 border-l pl-4`}>
        <p className="text-sm text-gray-700">{comment.content}</p>
        <p className="text-xs text-gray-400">
{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          <button onClick={() => setReplyingTo(comment._id)} className="ml-4 text-green-500 hover:underline text-xs">Reply</button>
          <button onClick={() => handleLike(comment._id)} className="ml-4 text-blue-500 hover:underline text-xs">
            {likes[comment._id] ? "Unlike" : "Like"}
          </button>
        </p>
        <div className="flex gap-2 mt-1 items-center">
          <button
            onClick={() => toggleLike(comment._id, comment.likedByCurrentUser)}
            className={`text-sm ${comment.likedByCurrentUser ? "text-blue-600" : "text-gray-500"}`}
          >
            {comment.likedByCurrentUser ? "Unlike" : "Like"} ({comment.likesCount || 0})
          </button>
          <button
            onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
            className="text-sm text-gray-500"
          >
            Reply
          </button>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
        {replyingTo === comment._id && (
          <div className="mt-2 ml-4">
            <input
              value={replies[comment._id] || ""}
              onChange={e => setReplies({ ...replies, [comment._id]: e.target.value })}
              placeholder="Write a reply..."
              className="border px-2 py-1 w-full mb-2"
            />
            <button
              onClick={() => handleReply(comment._id)}
              className="bg-gray-600 text-white px-3 py-1 rounded" disabled={submitting}
            >
              Post Reply
            </button>
          </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
        )}
        {children.map(child => renderComment(child, level + 1))}
      </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
        </motion.div>
    );
  };

return (
    <div className="overflow-x-hidden">
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          required
          className="border px-2 py-1 w-full"
        />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 flex items-center gap-2"
              disabled={posting}
            >
              {posting && <span className="loader border-white border-t-transparent w-4 h-4 rounded-full border-2 animate-spin" />}
              Post
            </button>
        
      </form>
      <div className="space-y-3">

  {loading && (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
      ))}
    </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
  )}
  {!loading && comments.filter(c => !c.parentComment).map((c: any) => renderComment(c))}
        
          <div key={c._id} className="border p-2 rounded">
            <p className="text-sm text-gray-700">{c.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              By {c.creator?.username || "Anonymous"} on {new Date(c.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2 items-center">
              <button
                onClick={() => toggleLike(c._id, c.likedByCurrentUser)}
                className={`text-sm ${c.likedByCurrentUser ? "text-blue-600" : "text-gray-500"}`}
              >
                {c.likedByCurrentUser ? "Unlike" : "Like"} {c.likesCount || 0}
        
              <button
                onClick={() => setReplyingTo(replyingTo === c._id ? null : c._id)}
                className="text-sm text-gray-500"
              >
                Reply
              </button>
        
            </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
            {replyingTo === c._id && (
              <div className="mt-2 ml-4">
                <input
                  value={replies[c._id] || ""}
                  onChange={e => setReplies({ ...replies, [c._id]: e.target.value })}
                  placeholder="Write a reply..."
                  className="border px-2 py-1 w-full mb-2"
                />
                <button
                  onClick={() => handleReply(c._id)}
                  className="bg-gray-600 text-white px-3 py-1 rounded" disabled={submitting}
                >
                  Post Reply
                </button>
        
              </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
            )}
            {renderReplies(c._id)}
          </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
        ))}
      </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
    </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
    </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 border-l pl-2 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-2">
                <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</div>
                <div className="text-sm">{reply.text}</div>
              </div>
            ))}
          </div>
        )}
  );
};

export default CommentsSection;

  const handleLike = useCallback((commentId) => {
    setLikes(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    // Placeholder for backend call
    // await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
  }, []);

  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      const newReply = {
        _id: Date.now().toString(),
        text: replyText,
        createdAt: new Date().toISOString(),
        parentId,
      };
      setComments(prev => prev.map(c =>
        c._id === parentId
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      ));
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Failed to post reply", err);
    }
  };