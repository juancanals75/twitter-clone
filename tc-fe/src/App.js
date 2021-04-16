import doge from './assets/doge.png'
import './App.css'
import DummyForm from './DummyForm'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
	// 'http://localhost:5000/posts'
	const [tweetsTable, setTweetsTable] = useState([])

	async function getTweets() {
		try {
			const { data } = await axios.get('http://localhost:5000/posts')
			console.log(data)
			setTweetsTable(data.messages)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => getTweets(), [])

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>DOGER</h1>
				<img src={doge} className='App-logo' alt='logo' />
				<button onClick={() => getTweets()}>REFRESH</button>
				<table style={{ width: '100%' }}>
					<tr>
						<th>Title</th>
						<th>Message</th>
					</tr>
					{tweetsTable &&
						tweetsTable.map(tweet => (
							<tr>
								<td>{tweet.title}</td>
								<td>{tweet.message}</td>
							</tr>
						))}
				</table>
				<h5>TRY MAKING A POST</h5>
				<div>
					<DummyForm />
				</div>
			</header>
		</div>
	)
}

export default App
