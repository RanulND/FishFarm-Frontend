import { Box, colors, Modal, Typography } from "@mui/material"
import FishFarmForm from "../fishFarmForm/FishFarmForm"
import WorkerForm from "../workerForm/WorkerForm"
import { ModalMode } from "../../utilities/enums/modalMode"
import WorkerDetails from "../workerDetails/WorkerDetails"

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    visibility: ModalMode
}
const ModalComponent = (props: Props) => {
    const handleVisibility = (isVisible: boolean) => {
        props.setOpen(isVisible)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#E2E2E2',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        color: "#000000"
      };

    return (
        <Modal
        open={props.open}
        onClose={() => handleVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {/* {
            props.visibility === ModalMode.FARM_ADD && <FishFarmForm />
          }
          {
            props.visibility === ModalMode.WORKER_ADD && <WorkerForm />
          } */}
          <WorkerDetails />

        </Box>
      </Modal>
    )
}

export default ModalComponent