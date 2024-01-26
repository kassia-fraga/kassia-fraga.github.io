import { gql } from "@apollo/client";

const WORK_FRAGMENT = gql`
    fragment WorkDetails on Work {
        company
        end
        isPresent
        start
        title
        logo {
            url
        }
    }
`

const AUTHOR_FRAGMENT = gql`
    fragment AuthorDetails on Author {
        name
        email
        skills
        role
        title
        intro
        introAbout
        bio {
            html
        }
        slug
        picture {
            url
        }
        social {
            twitterUrl
            githubUsername
            instagramUrl
            linkedinUrl
        }
        photos {
            url
        }
        works(orderBy: start_DESC) {
            ...WorkDetails
        }
    }
`

export const authorsQuery = gql`
    ${AUTHOR_FRAGMENT} ${WORK_FRAGMENT}
    query GetAuthors {
        authors {
            ...AuthorDetails
        }
    }
`

export const authorQuery = gql`
    ${AUTHOR_FRAGMENT} ${WORK_FRAGMENT}
    query GetAuthor($slug: String!) {
        author(where: { slug: $slug }) {
            ...AuthorDetails
        }
    }
`

const PROJECT_FRAGMENT = gql`
    fragment ProjectDetails on Project {
        name
        slug
        description
        tags
        demo
        sourceCode
        readme
        thumbnail {
            url
        }
    }
`

export const projectsQuery = gql`
    ${PROJECT_FRAGMENT}
    query GetProjects {
        projects {
            ...ProjectDetails
        }
    }
`

export const projectsSlugsQuery = gql`
    query GetProjectsSlugs {
        projects {
            slug
        }
    }
`

export const projectsByAuthorQuery = gql`
    ${PROJECT_FRAGMENT}
    query GetProjectsByAuthor($slug: String!) {
        projects(where: {authors_some: {slug: $slug}}) {
            ...ProjectDetails
        }
    }
`

export const projectQuery = gql`
    ${PROJECT_FRAGMENT}
    query GetProject($slug: String!) {
        project(where: { slug: $slug }) {
            ...ProjectDetails
            authors {
                name
                slug
                picture {
                    url
                }
            }
        }
    }
`

const POST_FRAGMENT = gql`
    fragment PostDetails on Post {
        title
        slug
        date
        content
        tags
        coverImage {
            url
        }
        authors {
            name
        }
    }
`

export const postsQuery = gql`
    ${POST_FRAGMENT}
    query GetPosts {
        posts {
            ...PostDetails
        }
    }
`

export const postQuery = gql`
    ${POST_FRAGMENT}
    query GetPost($slug: String!) {
        post(where: { slug: $slug }) {
            ...PostDetails
        }
    }
`

export const socialsQuery = gql`
    query GetSocials {
        socials {
            twitterUrl
            youTubeUrl
            facebookUrl
        }
    }
`

export const siteMetadataQuery = gql`
    query GetProjectMetadatas {
        projectMetadatas {
            name
            siteUrl
            description
            openGraphDefaultImage {
                url(
                    transformation: {
                        image: { resize: { width: 1200, height: 630, fit: clip } }
                    }
                )
            }
        }
    }
`
