import { CloudUpload } from "@mui/icons-material"
import { Box, Button, Divider, FormControlLabel, FormGroup, styled, Switch, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { uploadFileFarm } from "../../services/fileService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFishFarm, updateFishFarm } from "../../services/fishFarmService"
import { FishFarmRequestPayload, FishFarmResponsePayload } from "../../utilities/types/fishFarm"
import { ModalMode } from "../../utilities/enums/modalMode"

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    fishFarm?: FishFarmResponsePayload
    modaleMode: ModalMode
}

const FishFarmForm = (props:Props) => {
    const [name, setName] = useState("")
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [cageCount, setCageCount] = useState<number>(0)
    const [hasBarge, setHasBarge] = useState<boolean>(false)
    const [picture, setPicture] = useState<string>("test/test")

    const queryClient = useQueryClient();

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

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files && e?.target.files[0]
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            const res = await uploadFileFarm(formData)
            setPicture(res.data.path)
        }

    }

    const { mutateAsync: addMutation } = useMutation({
        mutationFn: (fishFarm: FishFarmRequestPayload) => createFishFarm(fishFarm),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fishfarms"] })
        }
    })

    const { mutateAsync: updateMutation } = useMutation({
        mutationFn: ({fishFarm,id}:{fishFarm: FishFarmRequestPayload, id: number}) => updateFishFarm(fishFarm,id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fishfarms"] })
        }
    })

    const handleSubmit = async () => {
        const fishFarm: FishFarmRequestPayload = {
            name: name,
            coordinate: { x: x, y: y },
            cageCount: cageCount,
            hasBarge: hasBarge,
            picture: picture

        }

        if(props.modaleMode === ModalMode.FARM_ADD){
            try {
                await addMutation(fishFarm);
                setName("")
                setX(0)
                setY(0)
                setCageCount(0)
                setHasBarge(false)
                setPicture("")
                props.setOpen(false)
            } catch (e) {
                console.error(e)
            }
        }else if((props.modaleMode === ModalMode.FARM_EDIT) && props.fishFarm){
            try {
                await updateMutation({fishFarm, id: props.fishFarm.id});
                setName("")
                setX(0)
                setY(0)
                setCageCount(0)
                setHasBarge(false)
                setPicture("")
                props.setOpen(false)
            } catch (e) {
                console.error(e)
            }
        }
        
    }

    useEffect(() => {
        if(props.modaleMode === ModalMode.FARM_EDIT && props.fishFarm){
            setName(props.fishFarm?.name)
            setCageCount(props.fishFarm.cageCount)
            setHasBarge(props.fishFarm.hasBarge)
            setX(props.fishFarm.coordinate.x)
            setY(props.fishFarm.coordinate.y)
        }
    },[props.modaleMode])

    return (
        <>
            <TextField id="filled-basic" label="Name" variant="filled" sx={{ marginY: 1, width: "100%" }} value={name} onChange={e => setName(e.target.value)} slotProps={{
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
                    value={x}
                    onChange={e => setX(parseFloat(e.target.value))}
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
                    value={y}
                    onChange={e => setY(parseFloat(e.target.value))}
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
                    value={cageCount}
                    onChange={e => setCageCount(parseInt(e.target.value))}
                />
                <FormGroup sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel control={<Switch checked={hasBarge} onChange={e => setHasBarge(e.target.checked)} />} label="Has a Barge" />
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
                        onChange={(event) => handleFileUpload(event)}
                        multiple={false}
                    />
                </Button>
            </div>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: "flex", gap: 2 }} justifyContent={"flex-end"}>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button sx={{ backgroundColor: "#000", color: "#FFF", padding: 1, borderRadius: 2 }} onClick={() => handleSubmit()}>{props.modaleMode === ModalMode.FARM_ADD? "Add a Fish Farm":"Update fish farm"} </Button>

            </Box>
        </>
    )
}

export default FishFarmForm