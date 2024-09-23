import { addImage, deleteImage, addComment, deleteComment, displayComments, changeImage } from './api.mjs'


document.addEventListener('DOMContentLoaded', function() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    if(images.length === 0) {
        return;
    }
    const count = document.querySelector('.count');
    count.textContent = 1 + '/' + images.length;
    const mainImage = document.getElementById('main-image');
    mainImage.src = images[0].url;
    const author = document.querySelector('.author');
    const title = document.querySelector('.description');
    author.textContent = "Author: " + images[0].author;
    title.textContent = "Title: " + images[0].title;
    
    displayComments(images[0].imageId);
    
});
document.getElementById('add-btn').addEventListener('click', function() {
    const formElement = document.querySelector('.add-form');
    formElement.classList.toggle('hidden');
    const images = JSON.parse(localStorage.getItem('images')) || [];
});


document.querySelector('.add-form form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const url = document.getElementById('url').value.trim();

    addImage(title, author, url);

    this.reset();
    location.reload();
});



document.getElementById('prev').addEventListener('click', function() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const count = document.querySelector('.count');
    let currentImageIndex = parseInt(count.textContent.split('/')[0]) - 1;
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = images.length - 1;
    }
    changeImage(currentImageIndex);
});

document.getElementById('next').addEventListener('click', function() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const count = document.querySelector('.count');
    let currentImageIndex = parseInt(count.textContent.split('/')[0]) - 1;
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }
    changeImage(currentImageIndex);
});


document.getElementById('delete-btn').addEventListener('click', function() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const count = document.querySelector('.count');    
    const currentImage = parseInt(count.textContent.split('/')[0]);
    const currentImageId = images[currentImage - 1].imageId;
    deleteImage(currentImageId);
    location.reload();
});

document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const count = document.querySelector('.count');   
    const currentImage = parseInt(count.textContent.split('/')[0]);
    const currentImageId = images[currentImage - 1].imageId;
    const author = document.getElementById('author-input').value;
    const content = document.getElementById('comment-input').value;
    addComment(currentImageId, author, content);
    this.reset();
    
    const commentSection = document.querySelector('.comment-section');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <div class="comment-top">
            <div class="comment-author">Author: ${author}</div> 
            <div class="comment-date">Date Posted: ${new Date().toLocaleDateString('en-US', {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            })}</div>
        </div>
        <div class="comment-middle">
            <div class="comment-content">${content}</div>
            <div class="comment-delete">
                <button type="button" class="button-cmt-delete">Delete</button>
            </div>
        </div>`;
    commentSection.appendChild(commentDiv);

    const deleteButton = commentDiv.querySelector('.button-cmt-delete');
    deleteButton.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        deleteComment(commentId);
        this.closest('.comment').remove();
    });

    const comments = commentSection.querySelectorAll('.comment');
    if (comments.length > 10) {
        commentSection.removeChild(comments[0]); 
    }
});



