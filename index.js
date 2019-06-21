'https://api.github.com/users/:username/repos'

function displayResult(responseJson) {

    console.log(responseJson);

    $('.github-Username-Container').empty();

    $('.github-Username-Container').append(
        `<img src="${responseJson[0].owner.avatar_url}" alt="repo Icon">

        <h1 class="repo-Name">${responseJson[0].owner.login}</h1>`
    )

    for (let i = 0; i < responseJson.length; i++) {
        $('.github-Username-Container').append(

            `<a href="https://github.com/${responseJson[i].full_name}" target="_blank">${responseJson[i].full_name}</a>`
            
        )
    }
    //takes info from json file and presents it to the user
}

function getRepo(searchName) {
    const url = `https://api.github.com/users/${searchName}/repos`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResult(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('.github-Username-Form').submit(event => {
      event.preventDefault();
      const searchName = $('#github-Username-Input').val();
      getRepo(searchName);
    });
  }
  
  $(watchForm);
  