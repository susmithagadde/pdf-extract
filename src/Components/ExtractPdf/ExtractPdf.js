import React,{Component} from "react";
import "./ExtractPdf.scss";
import TextEditor from "../TextEditor/TextEditor";

class ExtractPdf extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        return (

            <div className="extract-container">
                <h2 className="extracted-title">Qualitative Questions</h2>
                {this.props.PostData.map((data,index) => (<div className="questions-list" key={data.sequence_number}>

                    <span className="question-index" >{data.sequence_number+1}.</span>
                    <div className="question-section">

                        <p className="question-name">{data.question}</p>
                        <TextEditor text={data.answer} />
                    </div>
                </div>))}

            </div>

        );
    }
}

export default ExtractPdf;
