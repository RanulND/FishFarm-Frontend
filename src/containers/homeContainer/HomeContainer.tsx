import { Box, Button, Container, Modal } from "@mui/material"
import { useState } from "react"
import ModalComponent from "../../components/modal/Modal"
import ListItem from "../../components/listItem/ListItem"
import { ListItemMode } from "../../utilities/enums/listItemMode"
import { ModalMode } from "../../utilities/enums/modalMode"
import { useQuery } from "@tanstack/react-query"
import { getAllFishFarms } from "../../services/fishFarmService"
import Loader from "../../components/loader/Loader"
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm"
import { WorkerResponsePayload } from "../../utilities/types/worker"

const Home = () => {
    const [modalOpen,setModalOpen] = useState(false)
    const [modalMode,setModalMode] = useState<ModalMode>(ModalMode.NONE)
    const {data: fishFarms, isLoading} = useQuery({
        queryFn: () => getAllFishFarms(),
        queryKey: ["fishfarms"],
    });
    const [selectedFarm, setSelectedFarm] = useState<FishFarmResponsePayload>()
    const [selectedWorker, setSelectedWorker] = useState<WorkerResponsePayload>()

    if(isLoading) {
        return <Loader />
    }

    const handleModalContent = (mode: ModalMode) => {
        setModalOpen(true)
        setModalMode(mode)
    }
    return (
        <>
            <Container maxWidth={false}>
                <Box sx={{display:"flex", gap:2, paddingX: 5, marginTop:2}} justifyContent={"flex-end"}>
                    <Button sx={{backgroundColor: "#000", color:"#FFF",  padding: 1, borderRadius: 2}} onClick={() => handleModalContent(ModalMode.FARM_ADD)}>Add a Fish Farm</Button>
                    <Button sx={{backgroundColor: "#000", color:"#FFF",  padding: 1, borderRadius: 2}} onClick={() => handleModalContent(ModalMode.WORKER_ADD)}>Add a worker</Button>
                </Box>
            </Container>
            <Container maxWidth={false} sx={{paddingY: 2}}>
                <ListItem listItemMode={ListItemMode.FISH_FARM} farmItems={fishFarms?.data} setModalOpen={setModalOpen} setModalMode={setModalMode} setSelectedFarm={setSelectedFarm} setSelectedWorker={setSelectedWorker}  />
            </Container>
            <ModalComponent open={modalOpen} setOpen={setModalOpen} visibility={modalMode} selectedFarm={selectedFarm}   />
        </>

    )
}

export default Home