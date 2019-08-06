/*
import React from "react";
// import "brace/mode/javascript";
// import "brace/theme/monokai";
// import AceEditor from 'react-ace';

class CodeEditor extends React.Component {

	render() {
		return <div className="rounded">
			<AceEditor
				placeholder={this.props.placeHolder}
				mode="javascript"
				theme="monokai"
				name={this.props.name}
				height="250px"
				width="100%"
				orientation="beside"
				splits={1}
				useWorker={false}
				readOnly={this.props.readOnly}
				enableBasicAutocompletion={false}
				enableLiveAutocompletion={false}
				onChange={this.props.onChange && this.props.onChange(this.props.name)}
				fontSize={14}
				showPrintMargin={true}
				enableSnippets={this.props.enableSnippets}
				showGutter={true}
				highlightActiveLine={false}
				value={this.props.value}
				dragEnabled={this.props.dragEnabled}
				editorProps={{ $blockScrolling: false }}
				wrapEnabled={true}
				setOptions={{
					useWorker: true
				}}
				onLoad={(editor) => {
						editor.focus();
						editor.getSession().setUseWrapMode(true);
						editor.on("paste", function(e) {
								// console.log('onPaste');
								e.text = "";
						});
				}}
			/>

		</div>
	}
}



export default CodeEditor;*/