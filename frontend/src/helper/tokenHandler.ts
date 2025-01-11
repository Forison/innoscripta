export const getCookie = (): string | undefined => {
  return document.cookie.split(';').pop()?.split('access_token=').pop()
}

export const setCookie = (accessToken: string, tokenType: string): void => {
  document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`
  document.cookie = `token_type=${tokenType}; path=/; max-age=${60 * 60 * 24 * 7}`
}