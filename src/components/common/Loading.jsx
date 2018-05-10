import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
	render(){
		return (
			<div class="loading-wrapper">
				<ReactLoading className="loading" type="bars" color="#cc3c48" height={64} width={64} />
			</div>
		);
	}
}

export default Loading;