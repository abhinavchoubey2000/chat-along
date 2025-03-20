import React from "react";
import { CircularProgress, Container } from "@mui/material";

export default function loading() {
    return (
        <Container
            maxWidth={"sm"}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
            }}
        >
            <CircularProgress sx={{ color: "blue" }} size={100}/>
        </Container>
    );
}
