import React from "react";
import { Divider, FloatingActionButton } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import PhotoGallery from "./PhotoGallery";
import TopBar from "./TopBar";
import Headroom from "react-headroom";
import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app";
import IconButton from "material-ui/IconButton";
import ReactTooltip from "react-tooltip";
import ReactQueryParams from "react-query-params";
import { connect } from "react-redux";
import firebase, { auth } from "./firebase";

const uploadButtonStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  zIndex: 2
};

const ccc = window.cloudinary;

class GalleryLayout extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      images: {},
      singleView: false,
      userImagesTag: this.queryParams.name ? this.queryParams.name : "test",
      subject: ""
    };
    this.backFromSingle = this.backFromSingle.bind(this);
  }

  render() {
    return (
      <div>
        <Headroom>
          <TopBar
            backCallback={this.backFromSingle}
            singleView={this.state.singleView}
          />
        </Headroom>
        <div>
          <FloatingActionButton
            style={uploadButtonStyle}
            onClick={this.uploadWidget.bind(this)}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          <PhotoGallery
            images={this.state.images}
            singleView={this.state.singleView}
            onImageClick={this.changeToSingleView.bind(this)}
            user={this.props.user}
          />
        </div>
        <IconButton
          onClick={this.logout}
          style={{ width: 70, height: 70 }}
          iconStyle={{ width: 70, height: 70, padding: 14, color: "black" }}
        >
          <ActionExitToApp data-tip="Logout" />
          <ReactTooltip data-effect="float" />
        </IconButton>
      </div>
    );
  }

  logout = () => {
    auth.signOut().then(() => {
      this.props.dispatch({ type: "USER_SIGN_OUT" });
    });
  };

  componentDidMount() {
    var imagesRef = firebase.database().ref(this.getImagesRef());

    imagesRef.on("value", snapshot => {
      this.setState({ images: snapshot.val() || [] });
    });
    this.setState({ imagesRef });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board === this.props.board) return;
    this.state.imagesRef.off();

    var imagesRef = firebase.database().ref(this.getImagesRef());
    imagesRef.on("value", snapshot => {
      this.setState({ images: snapshot.val() || [] });
    });
    this.setState({ imagesRef });
  }

  backFromSingle() {
    this.setState({ singleView: false });
  }

  changeToSingleView() {
    this.setState({ singleView: true });
  }

  uploadWidget() {
    let _this = this;
    ccc.openUploadWidget(
      {
        cloud_name: "instaleesh",
        upload_preset: "ggdwq1ap",
        tags: [this.state.userImagesTag + this.state.subject]
      },
      function(error, results) {
        if (!error) {
          // _this.setState({ images: results.concat(_this.state.images) });
          results.forEach(result => _this.addImage(result.public_id));
        }
      }
    );
  }

  addImage = imageId => {
    var imagesRef = firebase.database().ref(this.getImagesRef());
    return imagesRef
      .push({ public_id: imageId, userData: this.props.user.providerData[0] })
      .then(ok => console.log(ok), error => console.error(error));
  };

  getImagesRef = () => {
    const designer = this.props.match.params.designer;
    const client = this.props.match.params.client;

    return (
      "/designers/" +
      designer +
      "/clients/" +
      client +
      "/boards/" +
      this.props.board +
      "/images"
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded,
    board: state.board
  };
};

export default connect(mapStateToProps)(GalleryLayout);
