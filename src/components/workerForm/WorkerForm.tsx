import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { WorkerRequestPayload, WorkerResponsePayload } from "../../utilities/types/worker";
import { uploadFileFarm } from "../../services/fileService";
import { ModalMode } from "../../utilities/enums/modalMode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorker, editWorker } from "../../services/workerService";
import { FishFarmResponsePayload } from "../../utilities/types/fishFarm";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    worker?: WorkerResponsePayload
    modaleMode: ModalMode
    selectedFarm: FishFarmResponsePayload | undefined
}

const WorkerForm = (props: Props) => {
    const [name, setName] = useState("")
    const [dob, setDob] = useState<Date>()
    const [certifiedUntil, setCertifiedUntil] = useState<Date>()
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState<number>(0)
    const [picture, setPicture] = useState<string>("")

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

    const handleChange = (event: SelectChangeEvent) => {
        setPosition(parseInt(event.target.value));
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files && e?.target.files[0]
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            const res = await uploadFileFarm(formData)
            setPicture(res.data.path)
        }

    }

    const { mutateAsync: addWorkerMutation } = useMutation({
        mutationFn: (worker: WorkerRequestPayload) => createWorker(worker),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] })
        }
    })

    const { mutateAsync: updateWorkerMutation } = useMutation({
        mutationFn: ({worker,id}:{worker: WorkerRequestPayload, id: number}) => editWorker(id, worker,),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] })
        }
    })

    const handleSubmit = async () => {
        if(props.modaleMode === ModalMode.WORKER_ADD && dob && certifiedUntil && props.selectedFarm){
            const worker: WorkerRequestPayload = {
                name: name,
                certifiedUntil: certifiedUntil.toISOString(),
                dob: dob.toISOString(),
                email: email,
                picture: picture,
                workerPosition: position,
                fishFarmId: props.selectedFarm.id
            }
            try{
                await addWorkerMutation(worker)
            }catch(err){
                console.error(err);
                
            }
        }

        
    }

    useEffect(() => {
        if (props.modaleMode === ModalMode.WORKER_EDIT && props.worker) {
            setName(props.worker.name)
            setDob(new Date(props.worker.dob))
            setCertifiedUntil(new Date(props.worker.certifiedUntil))
            setEmail(props.worker.email)
            setPosition(props.worker.workerPosition)
            setPicture(props.worker.picture)
        }
    }, [props.modaleMode])

    return (
        <>
            <TextField id="filled-basic" label="Name" variant="filled" sx={{ marginY: 1, width: "100%" }} slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }} value={name} onChange={e => setName(e.target.value)} />
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
                    onChange={e => setDob(new Date(e.timeStamp))}
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
                    onChange={e => setCertifiedUntil(new Date(e.timeStamp))}
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
                onChange={e => e.target.value}
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
                        onChange={(event) => handleFileUpload(event)}
                        multiple={false}
                    />
                </Button>
            </div>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: "flex", gap: 2 }} justifyContent={"flex-end"}>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button sx={{ backgroundColor: "#000", color: "#FFF", padding: 1, borderRadius: 2 }} onClick={() => handleSubmit()}>{props.modaleMode === ModalMode.WORKER_ADD? "Add a Worker":"Update Worker"}</Button>
            </Box>

        </>
    )
}

export default WorkerForm;