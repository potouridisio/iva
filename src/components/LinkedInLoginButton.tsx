import { Linkedin } from 'lucide-react'
import { useLinkedIn } from 'react-linkedin-login-oauth2'

type LinkedInLoginButtonProps = {
  onSuccess: (code: string) => void
}

function LinkedInLoginButton({ onSuccess }: LinkedInLoginButtonProps) {
  const { linkedInLogin } = useLinkedIn({
    clientId: '773tzc1jxss3gh',
    onSuccess,
    redirectUri: `${window.location.origin}/linkedin`,
    scope: 'openid,profile,email',
  })

  return (
    <button
      className="rounded-full bg-blue-500 p-3 text-white"
      onClick={linkedInLogin}
    >
      <Linkedin />
    </button>
  )
}

export default LinkedInLoginButton
