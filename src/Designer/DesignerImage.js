import React from "react";
import { Image } from "cloudinary-react";
import Edit from "material-ui/svg-icons/image/edit";
import firebase from "../firebase";

class DesignerImage extends React.Component {
  state = { logoPublicId: "kv1ode6kjfctemmgepn7" };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "60%",
            margin: "auto"
          }}
        >
          <Image
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              width: "100%"
            }}
            cloudName={"instaleesh"}
            publicId={this.state.logoPublicId}
          />
          <Edit
            style={{
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "grey",
              position: "relative",
              float: "right",
              bottom: "30px",
              right: "6px"
            }}
            onClick={this.editLogo}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/designers/" + this.props.designer + "/logo")
      .on("value", snapshot =>
        this.setState({ logoPublicId: snapshot.val() || "" })
      );
  }

  editLogo = () => {
    let _this = this;
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "instaleesh",
        upload_preset: "ggdwq1ap",
        tags: "logo"
      },
      function(error, results) {
        if (!error) {
          results.forEach(result => _this.setLogo(result.public_id));
        }
      }
    );
  };

  setLogo = public_id => {
    var logoRef = firebase
      .database()
      .ref("/designers/" + this.props.designer + "/logo");
    logoRef
      .set(public_id)
      .then(() => this.setState({ logoPublicId: public_id }));
  };
}

export default DesignerImage;
