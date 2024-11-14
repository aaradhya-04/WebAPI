document.getElementById("github-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting

    let username = document.getElementById("username").value;  // Get the username entered

    if (username) {
        fetchUserData(username);
    }
});

function fetchUserData(username) {
    const url = `https://api.github.com/users/${username}/repos`;

    // Make an AJAX request using Fetch API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
            fetchUserProfile(username);  // Additional step to show user details
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Unable to fetch data for this username.");
        });
}

function fetchUserProfile(username) {
    const profileUrl = `https://api.github.com/users/${username}`;

    fetch(profileUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-name").innerText = `${data.name} (@${data.login})`;
            document.getElementById("followers").innerText = data.followers;
            document.getElementById("following").innerText = data.following;
            document.getElementById("repo-count").innerText = data.public_repos;
            const avatar = document.getElementById("user-avatar");
            avatar.src = data.avatar_url;
            avatar.style.display = "block";
        });
}

function displayRepos(repos) {
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = "";  // Clear any previous data

    repos.forEach(repo => {
        let listItem = document.createElement("li");
        listItem.innerText = repo.name;
        listItem.addEventListener("click", () => {
            window.open(repo.html_url, '_blank');  // Open repo link in new tab
        });
        reposList.appendChild(listItem);
    });
}
