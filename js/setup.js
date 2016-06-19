'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import SiTopApp from './SiTopApp';

function setup(): React.Component{
class Root extends React.Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
        store: null,
      };
	}
	render(){
		// if (this.state.isLoading) {
  //       return null;
  //     }
		return (
			  <SiTopApp />
			);
		//<Provider store={this.state.store}>
		//	  <SiTopApp />
		//	</Provider>
	}
}
return Root;
}



export default setup;
