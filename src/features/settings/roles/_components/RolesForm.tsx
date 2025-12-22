type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord?: any;
};
const RolesForm = ({ setOpenModal, selectedRecord }: TProps) => {
  console.log(setOpenModal, selectedRecord);
  return <div>RolesForm</div>;
};

export default RolesForm;
