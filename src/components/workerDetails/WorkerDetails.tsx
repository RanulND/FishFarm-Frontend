import { Box, Container, Divider, Grid2 } from "@mui/material"

const WorkerDetails = () => {

    return (
        <Container maxWidth={false} sx={{ paddingY: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} display={"flex"} justifyContent={"start"} flexDirection={"column"} alignItems={"center"}>
                    <Box sx={{ height: 80, width: 80, backgroundColor: "red", borderRadius: "50%", alignSelf: "center" }}>

                    </Box>
                    <Box sx={{ textAlign: "center", paddingY: 2 }}>
                    <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Ranul Dayarathne</h4>

                    </Box>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 size={12} spacing={2} container marginTop={2}>
                    <Grid2 size={6}>
                        <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Email</h4>
                        <p style={{ margin: 0 }}>Ranul Dayarathne</p>
                    </Grid2>
                    <Grid2 size={6}>
                        <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Age</h4>
                        <p style={{ margin: 0 }}>26</p>
                    </Grid2>
                    <Grid2 size={6}>
                        <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Position</h4>
                        <p style={{ margin: 0 }}>Worker</p>
                    </Grid2>
                    <Grid2 size={6}>
                        <h4 style={{ fontWeight: 700, margin: 0, fontSize: "110%" }}>Certified Until</h4>
                        <p style={{ margin: 0 }}>26 of Feb 2025</p>
                    </Grid2>
                </Grid2>
            
        </Container>
    )
}

export default WorkerDetails