import { Delete, Edit, Visibility } from "@mui/icons-material"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ListItemMode } from "../../utilities/enums/listItemMode"
import { WorkerResponsePayload } from "../../utilities/types/worker"
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm"
import { ModalMode } from "../../utilities/enums/modalMode"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFishFarm } from "../../services/fishFarmService"
import { deleteWorker } from "../../services/workerService"
import { useNavigate } from "react-router"

interface ParentProps {
    listItemMode: ListItemMode
    setModalMode: React.Dispatch<React.SetStateAction<ModalMode>>
    farmItems?: FishFarmResponsePayload[]
    workerItems?: WorkerResponsePayload[]
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedFarm: React.Dispatch<React.SetStateAction<FishFarmResponsePayload | undefined>>
    setSelectedWorker: React.Dispatch<React.SetStateAction<WorkerResponsePayload | undefined>>
}

interface FishFarmProps {
    listItemMode: ListItemMode
    setModalMode: React.Dispatch<React.SetStateAction<ModalMode>>
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    fishFarm: FishFarmResponsePayload
    setSelectedFarm: React.Dispatch<React.SetStateAction<FishFarmResponsePayload | undefined>>
}

interface WorkerProps {
    listItemMode: ListItemMode
    setModalMode: React.Dispatch<React.SetStateAction<ModalMode>>
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    worker: WorkerResponsePayload
    setSelectedWorker: React.Dispatch<React.SetStateAction<WorkerResponsePayload | undefined>>

}

const FishFarmtableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">GPS Position</TableCell>
                <TableCell align="right">No. of Cages</TableCell>
                <TableCell align="right">Has Barge</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
    )

}

const WorkerTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Certified Until</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
    )
}

const FishFarmTableRow = (props: FishFarmProps) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const handleModalVisibility = () => {
        
        if (props.fishFarm){
            props.setModalMode(ModalMode.FARM_EDIT)
            props.setModalOpen(true)
            props.setSelectedFarm(props.fishFarm)
        }
        
    }

    const { mutateAsync: deleteFarmMutation } = useMutation({
        mutationFn: (id:number) => deleteFishFarm(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fishfarms"] })
        }
    })

    const handleDelete = async () => {
        try{
            await deleteFarmMutation(props.fishFarm.id)
        }catch(e){
            console.error(e)
        }
    }

    return (
        <TableRow
            key={"row.name"}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {props.fishFarm.name}
            </TableCell>
            <TableCell align="right">{`X: ${props.fishFarm.coordinate.x} , Y: ${props.fishFarm.coordinate.y}`}</TableCell>
            <TableCell align="right">{props.fishFarm.cageCount}</TableCell>
            <TableCell align="right">{props.fishFarm.hasBarge? "True":"False"}</TableCell>
            <TableCell align="right"><Button onClick={() => {handleModalVisibility()}}><Edit /></Button></TableCell>
            <TableCell align="right"><Button onClick={() => handleDelete()}><Delete /></Button></TableCell>
            <TableCell align="right"><Button onClick={() => navigate(`fishfarm/${props.fishFarm.id}`)}><Visibility /></Button></TableCell>
        </TableRow>
    )
}

const WorkerTableRow = (props: WorkerProps) => {

    const queryClient = useQueryClient()    

    const handleModalVisibility = () => {
        if (props.worker){
            props.setModalMode(ModalMode.WORKER_EDIT)
            props.setModalOpen(true)
            props.setSelectedWorker(props.worker)
        }
    }

    const handleDelete = async () => {

        // const { mutateAsync: deleteworkerMutation } = useMutation({
        //     mutationFn: (id:number) => deleteWorker(props.),
        //     onSuccess: () => {
        //         queryClient.invalidateQueries({ queryKey: ["fishfarms"] })
        //     }
        // })
        // try{
        //     await deleteWorkerMutation(props.fishFarm.id)
        // }catch(e){
        //     console.error(e)
        // }
    }
    return (
        <TableRow
            key={"row.name"}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {props.worker.name}
            </TableCell>
            <TableCell align="right">{props.worker.email}</TableCell>
            <TableCell align="right">{props.worker.dob}</TableCell>
            <TableCell align="right">{props.worker.workerPosition}</TableCell>
            <TableCell align="right">{props.worker.certifiedUntil}</TableCell>
            <TableCell align="right"><Button onClick={() => {handleModalVisibility()}}><Edit /></Button></TableCell>
            <TableCell align="right"><Button onClick={() => handleDelete()}><Delete /></Button></TableCell>
            <TableCell align="right"><Button><Visibility /></Button></TableCell>
        </TableRow>
    )
}

const ListItem = (props: ParentProps) => {

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {props.listItemMode === ListItemMode.FISH_FARM ? <FishFarmtableHeader /> : <WorkerTableHeader />}
                <TableBody>
                    {
                        props.listItemMode === ListItemMode.FISH_FARM && props.farmItems?.map((item, index) => <FishFarmTableRow fishFarm={item} key={index} listItemMode={props.listItemMode} setModalMode={props.setModalMode} setModalOpen={props.setModalOpen} setSelectedFarm={props.setSelectedFarm} />)
                    }
                    {
                        props.listItemMode === ListItemMode.WORKER && props.workerItems?.map((item, index) => <WorkerTableRow worker={item} key={index} listItemMode={props.listItemMode} setModalMode={props.setModalMode} setModalOpen={props.setModalOpen} setSelectedWorker={props.setSelectedWorker} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListItem