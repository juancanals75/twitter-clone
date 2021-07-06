// NPM
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
// Assets
import dogeFace from '../../assets/images/doge_face.png'
// Styles
import { Wrapper } from './Login.styles'

const Login: React.FC = () => {
	const history = useHistory()
	return (
		<Paper elevation={0}>
			<Wrapper>
				<img src={dogeFace} alt='logo' />
				<TextField variant='filled' label='Username' />
				<TextField variant='filled' label='Password' />
				<Button
					variant='contained'
					color='secondary'
					onClick={() => history.push('/posts')}
				>
					Login
				</Button>
			</Wrapper>
		</Paper>
	)
}

export default Login
