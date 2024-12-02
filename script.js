
function numberToWords(num) {
    const words = [
        "Zero", "One", "Two", "Three", "Four", 
        "Five", "Six", "Seven", "Eight", "Nine", 
        "Ten", "Eleven", "Twelve", "Thirteen", 
        "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
        "Eighteen", "Nineteen", "Twenty"
    ];

    if (num <= 20) {
        return words[num];
    }

    const tens = [
        "", "", "Twenty", "Thirty", "Forty", 
        "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    if (num < 100) {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        return unit === 0 ? tens[ten] : `${tens[ten]}-${words[unit]}`;
    }

    return num.toString(); 
}


function loaderAndFetch(url) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        reject(`Erreur : ${response.status}`);
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    loader.style.display = 'none'; 
                    resolve(data);
                })
                .catch(error => {
                    loader.style.display = 'none'; 
                    reject(error);
                });
        }, 3000); 
    });
}


function fetchAndDisplayPosts() {
    loaderAndFetch('https://jsonplaceholder.typicode.com/posts')
        .then(posts => {
            const container = document.getElementById('container');

            console.log(posts);

            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post-container';
                postDiv.innerHTML = `
                <div class="post">
                    <div class="circle">${post.id}</div>
                    <h2>Number ${numberToWords(post.id)}</h2>
                </div>
                <p>${post.title}</p>
                <p>${post.body}</p>
            `;

                container.appendChild(postDiv);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
}


fetchAndDisplayPosts();

