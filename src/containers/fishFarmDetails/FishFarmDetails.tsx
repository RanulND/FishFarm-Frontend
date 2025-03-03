import { Box, Container, Grid2 } from "@mui/material"
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm"
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { getFishFarm } from "../../services/fishFarmService";
import { getAllWorkersForFarm } from "../../services/workerService";
import { WorkerResponsePayload } from "../../utilities/types/worker";
import { ListItemMode } from "../../utilities/enums/listItemMode";
import { ModalMode } from "../../utilities/enums/modalMode";
import ListItem from "../../components/listItem/ListItem";
import ModalComponent from "../../components/modal/Modal";

const FishFarmDetails = () => {
    const [fishFarm, setFishFarm] = useState<FishFarmResponsePayload>();
    const [workers,setWorkers] = useState<WorkerResponsePayload[]>();
    const [selectedWorker,setSelectedWorker] = useState<WorkerResponsePayload>()

     const [modalOpen,setModalOpen] = useState(false)
    const [modalMode,setModalMode] = useState<ModalMode>(ModalMode.NONE)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getFishFarm(parseInt(id)).then(res => {
                setFishFarm(res.data)
            }).catch(err => {
                console.error(err);

            })
        }
    }, [id])

    useEffect(() => {
        if(id){
            getAllWorkersForFarm(parseInt(id)).then(res => {
                setWorkers(res.data)
            }).catch(err => {
                console.error(err);
                
            })
        }
    }, [])

    return (
        <Container maxWidth={false}>
            {
                fishFarm && (
                    <Grid2 container paddingY={2}>
                        <Grid2 size={7} sx={{textAlign:"center"}}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Fish_farm_Amarynthos_Euboea_Greece_-_edit1.jpg/580px-Fish_farm_Amarynthos_Euboea_Greece_-_edit1.jpg" width={"80%"} style={{borderRadius:5}} />
                        </Grid2>
                        <Grid2 size={5} container sx={{color:"#000"}} spacing={2}>
                            <Grid2 size={12} >
                                <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Name</h4>
                                <p style={{ margin: 0 }}>{fishFarm.name}</p>
                            </Grid2>
                            <Grid2 size={12}>
                                <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Coordinates</h4>
                                <p style={{ margin: 0 }}>{`X: ${fishFarm.coordinate.x} , Y: ${fishFarm.coordinate.y}`}</p>
                            </Grid2>
                            <Grid2 size={12}>
                                <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Cage Count</h4>
                                <p style={{ margin: 0 }}>{fishFarm.cageCount}</p>
                            </Grid2>
                            <Grid2 size={12}>
                                <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Has Barge</h4>
                                <p style={{ margin: 0 }}>{fishFarm.hasBarge ? "Yes" : "No"}</p>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                )
            }

            <h1 style={{textAlign:"center", color:"#000"}}>Workers</h1>

            <Container maxWidth={false} sx={{paddingY: 2}}>
                <ListItem listItemMode={ListItemMode.WORKER} workerItems={workers} setModalOpen={setModalOpen} setModalMode={setModalMode} setSelectedFarm={setFishFarm} setSelectedWorker={setSelectedWorker} />
            </Container>

            <ModalComponent open={modalOpen} setOpen={setModalOpen} visibility={modalMode} selectedFarm={fishFarm} selectedWorker={selectedWorker}   />

        </Container>

    )
}

export default FishFarmDetails