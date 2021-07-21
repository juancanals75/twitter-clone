// NPM
import { useState } from 'react'
import { useHistory } from 'react-router'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Assets
import dogeFace from '../../assets/images/doge_face.png'
import * as ROUTES from '../../constants/routes'
// Utils
import { login } from '../../utils/userUtils'
// Styles
import { Wrapper } from './Login.styles'
import { Typography } from '@material-ui/core'

const Login: React.FC = () => {
	const history = useHistory()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [attemptingLogin, setAttemptingLogin] = useState(false)
	const [loginError, setLoginError] = useState('')

	function onChangeHandler(event: any) {
		const { id, value } = event.target
		switch (id) {
			case 'username':
				setUsername(value)
				break
			case 'password':
				setPassword(value)
				break
			default:
				break
		}
	}

	async function loginHandler() {
		setAttemptingLogin(true)
		try {
			await login(username, password)
			history.push(ROUTES.POSTS)
		} catch (error) {
			setLoginError(error.message)
			console.error(error)
		} finally {
			setAttemptingLogin(false)
		}
	}

	return (
		<>
			<Paper elevation={0}>
				<Wrapper>
					<img src={dogeFace} alt='logo' />
					<Typography align='center' variant='h2'>
						WELCOME
					</Typography>
					<TextField
						variant='filled'
						label='Username'
						id='username'
						value={username}
						onChange={onChangeHandler}
					/>
					<TextField
						variant='filled'
						label='Password'
						id='password'
						value={password}
						type='password'
						onChange={onChangeHandler}
					/>
					<Button
						variant='contained'
						color='secondary'
						onClick={loginHandler}
					>
						{attemptingLogin ? (
							<CircularProgress variant='indeterminate' />
						) : (
							'Login'
						)}
					</Button>
					<Button
						color='primary'
						onClick={() => history.push(ROUTES.NEW_USER)}
					>
						Create new user
					</Button>
					<Typography align='center' variant='caption' color='error'>
						{loginError}
					</Typography>
				</Wrapper>
			</Paper>
		</>
	)
}

export default Login
