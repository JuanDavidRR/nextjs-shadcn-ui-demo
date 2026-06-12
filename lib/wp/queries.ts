export const HOMEPAGE_QUERY = /* GraphQL */ `
  query Homepage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      language {
        language_code
        native_name
      }
      translations {
        language {
          language_code
          native_name
        }
      }
      moduleGrid3ColCenterTop {
        g3ctHeadline
      }
    }
  }
`;
