import React from 'react'
import axios from 'axios'

class DummyForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			message: '',
		}
	}
	myChangeHandler = event => {
		let nam = event.target.name
		let val = event.target.value
		this.setState({ [nam]: val })
	}

	mySubmitHandler = event => {
		event.preventDefault()
		axios
			.post('http://localhost:5000/posts', this.state)
			.then(res =>
				this.setState({
					title: '',
					message: '',
				})
			)
			.catch(error => console.error(error))
	}

	render() {
		return (
			<form onSubmit={this.mySubmitHandler}>
				<p>Title:</p>
				<input
					type='text'
					name='title'
					onChange={this.myChangeHandler}
				/>
				<p>Message:</p>
				<input
					type='text'
					name='message'
					onChange={this.myChangeHandler}
				/>
				<input type='submit' value='SEND IT!' />
			</form>
		)
	}
}

export default DummyForm
