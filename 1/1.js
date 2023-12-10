
        document.getElementById("searchForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const query = document.getElementById("query").value;

            // Clear old results
            document.getElementById("results").innerHTML = '';

            // Fetch data from the TVMaze API
            fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    // Display the JSON data in the console
                    console.log(data);

                    // Display information on the webpage
                    data.forEach(tvShow => {
                        const article = document.createElement("article");

                        // Name
                        const nameHeader = document.createElement("h2");
                        nameHeader.textContent = tvShow.show.name;

                        // URL with target="_blank"
                        const urlLink = document.createElement("a");
                        urlLink.href = tvShow.show.url;
                        urlLink.target = "_blank";
                        urlLink.textContent = "Go to details";

                        // Medium image with optional chaining and default image
                        const img = document.createElement("img");
                        img.src = tvShow.show.image?.medium || 'https://via.placeholder.com/210x295?text=Not%20Found';
                        img.alt = tvShow.show.name;

                        // Summary in <div>
                        const summaryDiv = document.createElement("div");
                        summaryDiv.innerHTML = tvShow.show.summary;

                        // Append elements to article
                        article.appendChild(nameHeader);
                        article.appendChild(urlLink);
                        article.appendChild(img);
                        article.appendChild(summaryDiv);

                        // Append article to the results container
                        document.getElementById("results").appendChild(article);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
