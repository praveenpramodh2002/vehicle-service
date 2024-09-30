import PropTypes from 'prop-types';

const VehicleTable = ({ onEditVehicle, onDeleteVehicle, isDeletedTable }) => {
  // Component logic here
};

VehicleTable.propTypes = {
  onEditVehicle: PropTypes.func.isRequired,
  onDeleteVehicle: PropTypes.func.isRequired,
  isDeletedTable: PropTypes.bool.isRequired,
};

export default VehicleTable;
