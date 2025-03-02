import { CloudUpload } from "@mui/icons-material"
import { Button, FormControlLabel, FormGroup, styled, Switch, TextField } from "@mui/material"
import { useState } from "react"

const FishFarmForm = () => {
    const [name, setname] = useState("")
    const [x, setX] = useState<number>()
    const [y, setY] = useState<number>()
    const [cageCount, setCageCount] = useState<number>(0)
    const [hasBarge, setHasBarge] = useState<boolean>(false)
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
    return (
        <>
            <TextField id="filled-basic" label="Filled" variant="filled" sx={{ marginY: 1, width: "100%" }} slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }} />
            <div style={{ display: "flex", gap: 10 }}>
                <TextField
                    id="filled-number"
                    label="Cordinates-X"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{ marginY: 1 }}
                />
                <TextField
                    id="filled-number"
                    label="Cordinates-Y"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{ marginY: 1 }}
                />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                <TextField
                    id="filled-number"
                    label="No. of Cages"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{ marginY: 1, width: "50%" }}
                />
                <FormGroup sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel control={<Switch defaultChecked={false} />} label="Has a Barge" />
                </FormGroup>
            </div>
            <div style={{ marginTop: 5 }}>
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
        </>
    )
}

export default FishFarmForm