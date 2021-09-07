const deletePostHandler = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector('.deleteBtn').dataset.postid
    const response = await fetch(`api/dashboard/post/delete${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Post has been deleted')
        document.location.replace('/dashboard');
    } else {
        alert('Something went wrong. Please try again');
    }

};

document.querySelector('.deleteBtn').addEventListener('click', deletePostHandler);