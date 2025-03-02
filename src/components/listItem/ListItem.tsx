import { Delete, Edit, ViewAgenda } from "@mui/icons-material"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ListItemMode } from "../../utilities/enums/listItemMode"
import { WorkerResponsePayload } from "../../utilities/types/worker"
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm"

interface Props {
    listItemMode: ListItemMode
    farmItems?: FishFarmResponsePayload[]
    workerItems?: WorkerResponsePayload[]
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

const FishFarmTableRow = ({fishFarm}:{fishFarm: FishFarmResponsePayload}) => {

    return (
        <TableRow
            key={"row.name"}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {fishFarm.name}
            </TableCell>
            <TableCell align="right">{`X: ${fishFarm.coordinate.x} , Y: ${fishFarm.coordinate.y}`}</TableCell>
            <TableCell align="right">{fishFarm.cageCount}</TableCell>
            <TableCell align="right">{fishFarm.hasBarge}</TableCell>
            <TableCell align="right"><Button><Delete /></Button></TableCell>
            <TableCell align="right"><Button><Edit /></Button></TableCell>
            <TableCell align="right"><Button><ViewAgenda /></Button></TableCell>
        </TableRow>
    )
}

const WorkerTableRow = ({worker}: {worker: WorkerResponsePayload}) => {

    return (
        <TableRow
            key={"row.name"}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {worker.name}
            </TableCell>
            <TableCell align="right">{worker.email}</TableCell>
            <TableCell align="right">{worker.dob}</TableCell>
            <TableCell align="right">{worker.workerPosition}</TableCell>
            <TableCell align="right">{worker.certifiedUntil}</TableCell>
            <TableCell align="right"><Button><Delete /></Button></TableCell>
            <TableCell align="right"><Button><Edit /></Button></TableCell>
            <TableCell align="right"><Button><ViewAgenda /></Button></TableCell>
        </TableRow>
    )
}

const ListItem = (props: Props) => {

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {props.listItemMode === ListItemMode.FISH_FARM ? <FishFarmtableHeader /> : <WorkerTableHeader />}
                <TableBody>
                    {
                        props.listItemMode === ListItemMode.FISH_FARM && props.farmItems?.map(item => <FishFarmTableRow fishFarm={item} />)
                    }
                    {
                        props.listItemMode === ListItemMode.WORKER && props.workerItems?.map(item => <WorkerTableRow worker={item} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListItem