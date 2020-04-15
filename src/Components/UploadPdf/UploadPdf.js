import React,{Component} from "react";
import "./UploadPdf.scss";
import ExtractPdf from "../ExtractPdf/ExtractPdf";


class UploadPdf extends Component {
    constructor(props) {
        super(props);
        this.state={
            status: false,
            fileUploaded: false,
            data: [],
        };
    }

    onFileUpload=e => {

        document.getElementsByClassName("file-upload-wrapper")[0].setAttribute("data-text",e.target.value.replace(/.*(\/|\\)/,''));
        if(e.target.value) {
            this.setState({fileUploaded: true});
        }
    };

    onExtract=() => {

        this.setState({status: true},() => {
            import("../../data/post.json")
                .then(res => this.setState({
                    status: false,
                    data: res.default,
                }));
        });

    }


    render() {
        return (
            <div className="container1">
                <div className="upload-container">
                    <h2 className="extracted-title">Import PDF</h2>
                    <p className="lead"></p>
                    <div className="upload-section">
                        <div className="form">
                            <div className="file-upload-wrapper" data-text="Select your file!">
                                <input name="file-upload-field" type="file" className="file-upload-field" value="" onChange={e => this.onFileUpload(e)} />
                            </div>
                            <div className="extract-btn">
                                <button className="btn btn-primary" disabled={!this.state.fileUploaded} onClick={() => this.onExtract()}>Extract</button>
                            </div>
                        </div>

                    </div>


                </div>
                {this.state.status&&<div className="loader"></div>}

                {(this.state.data.length>0)&&<ExtractPdf status={this.state.status} PostData={this.state.data} />}
            </div>
        );
    }
}

export default UploadPdf;
