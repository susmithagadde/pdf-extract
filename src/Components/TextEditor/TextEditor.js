import React,{Component} from 'react';
import RichTextEditor from 'react-rte';



export default class TextEditor extends Component {
    constructor(props) {
        super(props);
        const textValue=props.text? RichTextEditor.createValueFromString(props.text,'html'):RichTextEditor.createEmptyValue();
        this.state={
            value: textValue,
            defaultValue: textValue,
            currentIdObj: {uuid: props.sequence_number,value: textValue},
        };
    }

    componentWillReceiveProps(nextProps,nextContext) {
        if((nextProps.text&&nextProps.text!==this.props.text)) {
            const textValue=RichTextEditor.createValueFromString(nextProps.text,'html');
            this.setState({value: textValue,currentIdObj: {uuid: nextProps.sequence_number,value: textValue}});
        }
    }

    onChange=(value) => {
        this.setState({
            currentIdObj: {uuid: this.props.uuid,value},
            value,
        });
        if(this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    onBlur=() => {
        const {currentIdObj}=this.state;
        if(this.props.textOnBlur) {
            this.props.textOnBlur(currentIdObj.value.toString('html'));
        }
    };

    render() {
        const {currentIdObj,defaultValue}=this.state;
        const {isOldVersion,uuid}=this.props;
        const stateTextVal=this.state.value;

        return (
            <div className="editor">
                <RichTextEditor
                    height={100}
                    value={currentIdObj.uuid===uuid? (typeof (stateTextVal)!=="undefined"? this.state.value:defaultValue):defaultValue}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    disabled={isOldVersion}
                />
            </div>
        );
    }
}