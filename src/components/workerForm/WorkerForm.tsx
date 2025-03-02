import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField } from "@mui/material";
import { useState } from "react";

const WorkerForm = () => {
    const [name, setname] = useState("")
    const [dob, setDob] = useState<Date>()
    const [certifiedUntil, setCertifiedUntil] = useState<Date>()
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState<number>(0)
    const [picture, setPicture] = useState<File>()


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleChange = (event: SelectChangeEvent) => {
        setPosition(parseInt(event.target.value));
    };

    const handleSubmit = () => {

    }

    return (
        <>
            <TextField id="filled-basic" label="Name" variant="filled" sx={{ marginY: 1, width: "100%" }} slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }} value={name} />
            <div style={{ display: "flex", gap: 10 }}>
                <TextField
                    id="filled-number"
                    label="Date of Birth"
                    type="date"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{ marginY: 1, width: "50%" }}
                    value={dob}
                />
                <TextField
                    id="filled-number"
                    label="Certified Until"
                    type="date"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{ marginY: 1, width: "50%" }}
                    value={certifiedUntil}
                />
            </div>
            <TextField
                id="filled-number"
                label="Email"
                type="email"
                variant="filled"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                sx={{ marginY: 1, width: "100%" }}
                value={email}
            />
            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">Worker Position</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position.toString()}
                    label="Worker Position"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>CEO</MenuItem>
                    <MenuItem value={2}>Worker</MenuItem>
                    <MenuItem value={3}>Captain</MenuItem>
                </Select>
            </FormControl>
            <div style={{ marginTop: 10 }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                >
                    Upload Picture
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple={false}
                    />
                </Button>
            </div>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: "flex",gap:2 }} justifyContent={"flex-end"}>
                <Button sx={{ backgroundColor: "#000", color: "#FFF", padding: 1, borderRadius: 2 }} onClick={() => handleSubmit()}>Add a Fish Farm</Button>
                <Button>Add a worker</Button>
            </Box>

        </>
    )
}

export default WorkerForm;