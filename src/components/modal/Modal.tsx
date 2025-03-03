import { Box, Modal, Typography } from "@mui/material"
import FishFarmForm from "../fishFarmForm/FishFarmForm"
import WorkerForm from "../workerForm/WorkerForm"
import { ModalMode } from "../../utilities/enums/modalMode"
import WorkerDetails from "../workerDetails/WorkerDetails"
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm"
import { WorkerResponsePayload } from "../../utilities/types/worker"

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    visibility: ModalMode
    selectedFarm?: FishFarmResponsePayload
    selectedWorker?: WorkerResponsePayload
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
          {
            (props.visibility === ModalMode.FARM_ADD|| props.visibility === ModalMode.FARM_EDIT) && "Fish Farm Details"
          }
          {
            (props.visibility === ModalMode.WORKER_ADD) || (props.visibility === ModalMode.WORKER_EDIT) && "Worker Details"
          }
          </Typography>
          {
            (props.visibility === ModalMode.FARM_ADD|| props.visibility === ModalMode.FARM_EDIT) && <FishFarmForm setOpen={props.setOpen} modaleMode={props.visibility} fishFarm={props.selectedFarm} />
          }
          {
            (props.visibility === ModalMode.WORKER_ADD|| props.visibility === ModalMode.WORKER_EDIT) && <WorkerForm setOpen={props.setOpen} worker={props.selectedWorker} modaleMode={props.visibility} selectedFarm={props.selectedFarm} />
          }
          {
            props.visibility === ModalMode.WORKER_VIEW && props.selectedWorker && <WorkerDetails worker={props.selectedWorker}  />
          }

        </Box>
      </Modal>
    )
}

export default ModalComponent