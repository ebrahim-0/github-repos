let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let repo = document.querySelector(".repo");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

async function getData() {
  if (input.value == "") {
    repo.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    try {
      let data = await fetch(
        `https://api.github.com/users/${input.value}/repos`
      );
      let myData = await data.json();
      repo.innerHTML = "";

      myData.forEach((data) => {
        let div = document.createElement("div");
        let repoName = document.createTextNode(data.name);
        div.appendChild(repoName);
        let linkRepo = document.createElement("a");
        let linkStars = document.createElement("span");
        let links = document.createElement("span");
        links.classList.add("links");
        linkStars.classList.add("stars");
        linkStars.href = data.stargazers_count;
        links.appendChild(linkStars);
        links.appendChild(linkRepo);
        let urlLinkText = document.createTextNode("Visit Repo");
        let urlStarsText = document.createTextNode(
          `Stars ${data.stargazers_count}`
        );
        linkRepo.appendChild(urlLinkText);
        linkStars.appendChild(urlStarsText);
        linkRepo.href = `https://github.com/${input.value}/${data.name}`;

        linkRepo.setAttribute("target", "_blank");
        linkStars.setAttribute("target", "_blank");

        repo.appendChild(div);
        div.appendChild(links);
      });
    } catch {
      console.log(Error("there aren't Repo Founded"));
    }
  }
}
