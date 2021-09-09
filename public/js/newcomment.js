const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('.comment').value.trim();
    const post_id = document.querySelector('#post').dataset.postid

    if (content) {
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Thank you for your comment.')
            document.location.reload();
        } else {
            alert('Something went wrong.');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);