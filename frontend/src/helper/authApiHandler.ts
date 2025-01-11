import { User } from "../interface"
import { setCookie } from "./tokenHandler"

export const authApiHandler = (
  url: string,
  values: User,
  setVariant: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  navigate: any,
  successMessage: string,
  errorMessage: string
) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json();
    })
    .then((data) => {
      setVariant('success')
      setMessage(successMessage)
      const { access_token, token_type } = data
      setCookie(access_token, token_type)
      setTimeout(() => {
        setVariant('')
        navigate('/')
      }, 2000)
    })
    .catch((error) => {
      console.error('Error:', error)
      setVariant('danger')
      setMessage(errorMessage)
    })
}
