import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { PDFDocument } from "pdf-lib";
import { Box, Button, Divider, List, ListItem, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Styles } from "@/theme/Styles";

export const PDFUploader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);

        for (const file of fileArray) {
            await processPDF(file);
        }
    };

    const processPDF = async (file: File) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const metadata = pdfDoc.getSubject() ?? "";

            if (metadata) {
                try {
                    const decodedData = atob(metadata);
                    const jsonData = JSON.parse(decodedData);
                    console.log(`Extracted Data from ${file.name}:`, jsonData);
                } catch (error) {
                    console.error(`Error decoding or parsing metadata from ${file.name}:`, error);
                }
            } else {
                console.warn(`No subject metadata found in ${file.name}`);
            }
        } catch (error) {
            console.error(`Error processing PDF ${file.name}:`, error);
        }
    };

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
        <Box sx={{ border: '3px solid #ccc', borderRadius: '8px', m: 10 }}>
            <Typography variant="h3" textAlign="center" sx={Styles.Header}>Upload PDF's</Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ m: 10 }}>
                <Grid>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        size="large"
                    >
                        Upload
                        <VisuallyHiddenInput
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>
                </Grid>
                <Grid>
                    <List>
                        {files.map((file, index) => (
                            <Box key={file.name + index}>
                                <ListItem key={`${file.name}-${index}`}>{index + 1}. {file.name}</ListItem>
                                <Divider variant="middle" component="li" />
                            </Box>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Typography variant="h6" sx={Styles.Total}>Total Files: {files.length}</Typography>
        </Box>
    );
};

