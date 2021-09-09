
const editCommentFormHandler = async (event) => {
    event.preventDefault();
    const comment_id = document.querySelector('#comment-form').dataset.commentid
    const postId = document.querySelector('#comment-form').dataset.postid
    const content = document.querySelector('#content').value.trim();
    if (content) {
        const response = await fetch(`/api/posts/comments/edit/${comment_id}`, {
            method: 'PUT',
            body: JSON.stringify({ comment_id, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert('Edit successful. Redirecting you to the post.')
            document.location.replace(`/post/${postId}`);
        } else {
            alert('That did not work, please try again');
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', editCommentFormHandler);