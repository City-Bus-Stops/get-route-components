import { connect } from 'react-redux';

import Root from '../../components/Root/Root';

const mapStateToProps = (state, ownProps) => ({
  modalConfig: state.modalDialogConfig,
  children: ownProps.children,
  location: ownProps.location,
  notifications: state.notifications,
  IsSpinnerActive: state.spinner,
});

export default connect(mapStateToProps, null)(Root);
