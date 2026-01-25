
const query = `
    query Publication {
      publication(host: "amansrivastav.hashnode.dev") {
        title
        posts(first: 5) {
          edges {
            node {
              title
              ogMetaData {
                image
              }
              coverImage {
                url
              }
            }
          }
        }
      }
    }
`;

async function check() {
    try {
        const response = await fetch("https://gql.hashnode.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

check();
