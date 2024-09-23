/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

****************************** */

// add an image to the gallery
export function addImage(title, author, url) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const imageExists = images.some(image => image.url === url);

    if (imageExists) {
        alert('Image already exists in the gallery');
        return;
    }

    const image = {
        imageId: Date.now().toString(),
        title: title,
        author: author,
        url: url,
        Date: Date.now()
    }

    images.push(image);
    localStorage.setItem('images', JSON.stringify(images));
}

// delete an image from the gallery given its imageId
export function deleteImage(imageId) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const newImages = images.filter(image => image.imageId != imageId);
    localStorage.setItem('images', JSON.stringify(newImages));
}

// add a comment to an image
export function addComment(imageId, author, content) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    const comment = {
        commentId: Date.now().toString(),
        imageId: imageId,
        author: author,
        content: content,
        Date: Date.now()
    }

    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

//display all comments for an image
export function displayComments(imageId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    console.log(comments)
    const commentsImage =  comments.filter(comment => comment.imageId === imageId);
    const commentSection = document.querySelector('.comment-section');
    const recentComments = commentsImage.slice(-10);

    commentSection.innerHTML = '';

    for (const comment of recentComments) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-top">
                <div class="comment-author">Author: ${comment.author}</div> 
                <div class="comment-date">Date Posted: ${new Date(comment.Date).toLocaleDateString('en-US', {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                })}</div>
            </div>
            <div class="comment-middle">
                <div class="comment-content">${comment.content}</div>
                <div class="comment-delete">
                    <button type="button" class="button-cmt-delete" comment-id="${comment.commentId}">Delete</button>
                </div>
            </div>`;
        commentSection.appendChild(commentDiv); 
    }
    const deleteButtons = document.querySelectorAll('.button-cmt-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.getAttribute('comment-id');
            deleteComment(commentId);

            this.closest('.comment').remove();
        });
    });
}

// delete a comment to an image
export function deleteComment(commentId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const newComments = comments.filter(comment => comment.commentId != commentId);
    localStorage.setItem('comments', JSON.stringify(newComments));
}

// Change the main image
export function changeImage(index) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const mainImage = document.getElementById('main-image');
    const author = document.querySelector('.author');
    const title = document.querySelector('.description');
    const count = document.querySelector('.count');

    mainImage.classList.add('fade-out');

    setTimeout(() => {
        mainImage.src = images[index].url;
        author.textContent = "Author: " + images[index].author;
        title.textContent = images[index].title;
        displayComments(images[index].imageId);
        count.textContent = (index + 1) + '/' + images.length;
        mainImage.classList.remove('fade-out');
        mainImage.classList.add('fade-in');

        setTimeout(() => {
            mainImage.classList.remove('fade-in');
        }, 500); 
    }, 500); 
}