const deletePostHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#deleteBtn').dataset.postid
    const response = await fetch(`/api/posts/delete/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something went wrong.');
    }
};

document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler);