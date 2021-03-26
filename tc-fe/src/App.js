import doge from './assets/doge.png'
import './App.css'
import DummyForm from './DummyForm'

function App() {
	// 'http://localhost:5000/posts'

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>DOGER</h1>
				<img src={doge} className='App-logo' alt='logo' />
				<table style={{ width: '100%' }}>
					<tr>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Age</th>
					</tr>
					<tr>
						<td>Jill</td>
						<td>Smith</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Eve</td>
						<td>Jackson</td>
						<td>94</td>
					</tr>
				</table>
				<h5>TRY MAKING A POST</h5>
				<div>
					{/* <form onSubmit={dummySubmitFunction}>
						<label for='title'>With a title</label>
						<input type='text' name='title' id='title' />
						<label for='message'>And a message</label>
						<input type='text' name='message' id='message' />
						<button type='submit'>SEND IT!</button>
					</form> */}
					<DummyForm />
				</div>
			</header>
		</div>
	)
}

export default App
