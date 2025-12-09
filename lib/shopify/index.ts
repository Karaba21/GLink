const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({
    query,
    variables,
    headers,
    cache = 'force-cache'
}: {
    query: string;
    variables?: Record<string, any>;
    headers?: HeadersInit;
    cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;
    const key = storefrontAccessToken;

    if (!domain || !key) {
        throw new Error('Missing Shopify environment variables');
    }

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            next: { revalidate: 900 } // 15 minutes
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body
        };
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }

        throw new Error('Shopify Fetch Error');
    }
}

export type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage?: {
        url: string;
        altText: string;
    };
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    variants: {
        edges: {
            node: {
                id: string;
                title: string;
            };
        }[];
    };
};

export async function getProducts(): Promise<ShopifyProduct[]> {
    const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<{
        data: {
            products: {
                edges: {
                    node: ShopifyProduct;
                }[];
            };
        };
    }>({
        query
    });

    return res.body.data.products.edges.map((edge) => edge.node);
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
    const query = `
    mutation createCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({
        query,
        variables: { lines },
        cache: 'no-store'
    });

    return res.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    const query = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({
        query,
        variables: { cartId, lines },
        cache: 'no-store'
    });

    return res.body.data.cartLinesAdd.cart;
}

export async function getCart(cartId: string) {
    const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({
        query,
        variables: { cartId },
        cache: 'no-store'
    });

    return res.body.data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
    const query = `
    mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({
        query,
        variables: { cartId, lineIds },
        cache: 'no-store'
    });

    return res.body.data.cartLinesRemove.cart;
}

export async function updateCartLineQuantity(cartId: string, lineId: string, quantity: number) {
    const query = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({
        query,
        variables: {
            cartId,
            lines: [{ id: lineId, quantity }]
        },
        cache: 'no-store'
    });

    return res.body.data.cartLinesUpdate.cart;
}
