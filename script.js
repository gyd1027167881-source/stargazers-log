const repositoryList = document.querySelector("#repository-list");

function renderRepositories(events) {
  repositoryList.replaceChildren();

  const starredRepositories = events.filter((event) => event.type === "starred");

  if (starredRepositories.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-message";
    emptyMessage.textContent = "No starred repositories yet.";
    repositoryList.append(emptyMessage);
    return;
  }

  for (const event of starredRepositories) {
    const item = document.createElement("li");
    const card = document.createElement("article");
    const link = document.createElement("a");
    const owner = document.createElement("span");
    const description = document.createElement("p");
    const date = document.createElement("p");

    card.className = "repository-card";
    link.href = event.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = event.repository;
    owner.className = "repository-owner";
    owner.textContent = ` by ${event.owner}`;
    description.className = "repository-description";
    description.textContent = event.description;
    date.className = "repository-date";
    date.textContent = `Starred ${event.starredAt}`;

    link.append(owner);
    card.append(link, description, date);
    item.append(card);
    repositoryList.append(item);
  }
}

fetch("./events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status}).`);
    }

    return response.json();
  })
  .then(renderRepositories)
  .catch((error) => {
    const errorMessage = document.createElement("li");
    errorMessage.className = "list-message";
    errorMessage.textContent = `${error.message} Please try again later.`;
    repositoryList.replaceChildren(errorMessage);
  });
