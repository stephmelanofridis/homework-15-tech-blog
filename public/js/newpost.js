const postFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Your post has been published! View post on your dashboard.')
            document.location.replace('/dashboard');
        } else {
            alert('Something went wrong.');
        }
    }
};

document.querySelector('.blog-post-form').addEventListener('submit', postFormHandler);