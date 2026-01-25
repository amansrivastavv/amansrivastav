const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com/";

export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: {
    url: string;
  };
  publishedAt: string;
  readTimeInMinutes: number;
  tags?: {
    name: string;
    slug: string;
  }[];
}

export interface HashnodePostFull extends HashnodePost {
  content: {
    html: string;
  };
  author: {
    name: string;
    profilePicture: string;
  };
}

export async function fetchHashnodePosts(hostname: string) {
  const query = `
    query Publication {
      publication(host: "${hostname}") {
        title
        posts(first: 20) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: 'no-store' // Ensure fresh data on every request
    });

    const data = await response.json();
    return data.data.publication.posts.edges.map((edge: { node: HashnodePost }) => edge.node) as HashnodePost[];
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error);
    return [];
  }
}

export async function fetchHashnodePostBySlug(hostname: string, slug: string) {
  const query = `
    query Post($slug: String!) {
      publication(host: "${hostname}") {
        post(slug: $slug) {
          id
          title
          brief
          content {
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          author {
            name
            profilePicture
          }
          tags {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query,
        variables: { slug }
      }),
      cache: 'no-store' // Ensure fresh data
    });

    const data = await response.json();
    return data.data.publication.post;
  } catch (error) {
    console.error("Error fetching Hashnode post:", error);
    return null;
  }
}
