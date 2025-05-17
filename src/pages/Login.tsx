import { LoginForm } from "../components/auth/LoginForm"
import { AuthLayout } from "../layouts/AuthLayout"


export default () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}