var rows;

function init()
{
    rows = Array.from(topics.children).slice(1);

    rows.forEach(row => {
        // Make it visible on click.
        row.addEventListener("click", function() {
            // Check if there's a demo.
            if (this.cells[1].dataset.demo == undefined)
                return;

            // There can be more than one demo.
            var demos = this.cells[1].dataset.demo.split(" ")

            // Append the demo gif if it exists
            if (!this.demo) {
                this.demo  = new Array();
                demos.forEach(name => {
                    var i = document.createElement("img");

                    // Calculate the url
                    i.setAttribute("src", `demos/${name}.gif`);

                    // Add to list.
                    this.demo.push(i);
                });
            }

            // Show or hide demos appropriate.
            if (this.cells[1].contains(this.demo[0])) {
                this.demo.forEach(d => this.cells[1].removeChild(d));
            } else {
                this.demo.forEach(d => this.cells[1].appendChild(d));
            }
        });
    });
}

function filter()
{
    var q = query.value.toUpperCase();
    var filters = Array.from(document.getElementsByClassName("filter"));

    rows.forEach(row => {
        var rowtext = row.innerText.toUpperCase();
        var filtered = false;

        // Normalize the row text.
        rowtext = rowtext.replace(/\n/g,"").replace(/ +/g, " ");

        // Check if the search text matches.
        if (rowtext.search(q) < 0) {
            row.style.display = "none";
            return;
        }

        // Now check if the filters match.
        filters.forEach(f => {
            filtered |= row.dataset.tags.split(" ").includes(f.id) & f.checked;
        });

        if (filtered == false) {
            row.style.display = "none";
            return;
        }

        // Search text and filters okay, visible.
        row.style.display = "";
    });
}
