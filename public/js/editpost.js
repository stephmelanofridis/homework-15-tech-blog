const editPostFormHandler = async (event) => {
    event.preventDefault();
    const postID = document.querySelector('.edit-post-form').dataset.postid
    const title = document.querySelector('.blog-title').value.trim();
    const content = document.querySelector('.blog-content').value.trim();

    if (content) {
        const response = await fetch(`/api/posts/edit/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({ postID, title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Your post has been edited. View your changes from your dashboard.')
            document.location.replace('/dashboard');
        } else {
            alert('That did not work, please try again');
        }
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);