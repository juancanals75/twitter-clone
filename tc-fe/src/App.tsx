// NPM
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
// Styles
import { Wrapper } from './App.styles'
// Pages
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage'

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	return (
		<Wrapper>
			<Switch>
				<Route exact path='/' component={LoginPage} />
				<Route path='/posts' component={PostsPage} />
			</Switch>
		</Wrapper>
	)
}

export default App
