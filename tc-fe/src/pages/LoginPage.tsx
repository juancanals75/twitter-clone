// NPM
import Box from '@material-ui/core/Box'
// Components
import Login from '../components/Login'

const LoginPage: React.FC = () => {
	return (
		<Box
			height='100vh'
			width='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Login />
		</Box>
	)
}

export default LoginPage
