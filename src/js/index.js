//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import { Home } from "./component/home.js";

//render your react application

class Todo extends React.Component {
	constructor() {
		super();
		this.process = this.process.bind(this);
		this.tobedeleted = this.tobedeleted.bind(this);

		this.state = {
			notes: []
		};
	}
	process(e) {
		if (e.key === "Enter") {
			var holder = e.target.value;
			this.setState(() => {
				var tempArray = this.state.notes;
				tempArray.push(
					<div key={holder}>
						{holder}
						<input
							type="button"
							id={holder}
							value="delete"
							onClick={this.tobedeleted}
						/>
					</div>
				);
				return { notes: tempArray };
			});
		}
	}
	tobedeleted(e) {
		const place = e.target.getAttribute("id");
		this.setState(() => {
			const filteredOne = this.state.notes.filter(value => {
				if (place == value.key) {
					return false;
				} else {
					return true;
				}
			});
			return { notes: filteredOne };
		});
	}
	render() {
		var empty = "";
		if (this.state.notes.length == 0) {
			empty = "No tasks add a task";
		}
		return (
			<div>
				<input type="text" onKeyDown={this.process} />
				<div>{this.state.notes}</div>
				<div>{empty}</div>
				<div>{this.state.notes.length + " item left"}</div>
			</div>
		);
	}
}

ReactDOM.render(<Todo />, document.querySelector("#app"));
