import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from "pdf-lib";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useWorkouts } from '@/Hooks/WorkoutCalulatorHooks';
import { Styles } from '@/theme/Styles';
import { useNavigate } from 'react-router-dom';

export const GeneratePDF: React.FC = () => {
    const { workouts } = useWorkouts();
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)

    // keep for development
    // useEffect(() => {
    //     const jsonString = JSON.stringify(workouts);
    //     console.log("JSON", jsonString);
    //     const base64Encoded = btoa(jsonString);
    //     console.log("Base64 Encoded JSON", base64Encoded)
    // }, [workouts]);

    const generateCustomPDF = async (): Promise<Uint8Array> => {
        // Fetch and load the template
        const templateBytes = await fetch("/flex-iq-pdf-template-no-icon-font-carlito.pdf").then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(templateBytes);

        let pages = pdfDoc.getPages();
        let templatePage = pages[0]; // Store the original template page
        let page = templatePage;

        // styles
        let y = 630; // Initial Y position for text
        const headerSize = 18;
        const subHeader = 14;
        const textSize = 14;
        const xAxis = 30;
        const lineSpacing = 25; // Space between each line
        const setSpacing = 20;  // Space between sets
        const pageMargin = 50;

        // Function to create a clean new page from the template
        const addNewPageFromTemplate = async () => {
            const newDoc = await PDFDocument.load(templateBytes);
            const [newPage] = await pdfDoc.copyPages(newDoc, [0]); // Copy blank template
            return pdfDoc.addPage(newPage);
        };

        page.drawText(`${workouts[0]?.generatedName}`, { x: xAxis, y: 710, size: headerSize })
        page.drawText(`Weight: ${workouts[0]?.bodyWeight}kg`, { x: xAxis, y: 685, size: subHeader })
        page.drawText(`Total TUT: ${workouts[0]?.tut}`, { x: xAxis, y: 665, size: subHeader })
        for (const [exerciseIndex, exercise] of workouts[0].exercises?.entries() ?? []) {
            // If running out of space, add a new template-based page
            if (y < pageMargin + (3 * lineSpacing)) {
                page = await addNewPageFromTemplate();
                // y = 700; // Reset y for new page
            }
            // Add exercise details
            page.drawText(`${exerciseIndex + 1}: ${exercise.name}`, { x: xAxis, y, size: textSize, color: rgb(0, 0, 0) });
            y -= lineSpacing;

            page.drawText(`Assisted: ${exercise.assisted ? "Yes" : "No"}`, { x: xAxis, y, size: 12, color: rgb(0, 0, 0) });
            y -= lineSpacing;

            page.drawText(`TUT Per Exercise: ${exercise.tut}`, { x: xAxis, y, size: 12, color: rgb(0, 0, 0) });
            y -= lineSpacing;

            // Add sets for the exercise
            for (const [_, set] of exercise.sets.entries()) {
                if (y < pageMargin + setSpacing) {
                    page = await addNewPageFromTemplate();
                    y = 700; // Reset Y for the new page
                }
                console.log("Assited New Weight: ", exercise.assisted ? (workouts[0]?.bodyWeight ?? 0) - set.resistance : set.resistance)

                page.drawText(`- ${set.reps} reps, ${exercise.assisted ? (workouts[0]?.bodyWeight ?? 0) - set.resistance : set.resistance}kg, Tempo: ${set.tempo}, RPE: ${set.rpe}, TUT: ${set.tut}`, {
                    x: xAxis,
                    y,
                    size: 10,
                    color: rgb(0, 0, 0),
                });

                y -= setSpacing;
            }

            y -= lineSpacing; // Extra space before next exercise
        }

        pdfDoc.setTitle(`${workouts[0].generatedName}`)
        const jsonString = JSON.stringify(workouts[0]);
        const base64Encoded = btoa(jsonString);
        pdfDoc.setAuthor("FlexIQ")
        pdfDoc.setCreator("FlexIQ")
        pdfDoc.setSubject(base64Encoded)

        const pdfBytes = await pdfDoc.save()
        return pdfBytes;
    }

    useEffect(() => {
        generateCustomPDF().then((pdfBytes) => {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        });
    }, [workouts]);

    const downloadPDF = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${workouts[0].generatedName}.pdf`;
            link.click();
        }
    };

    const handleReset = () => {
        navigate("/");
        window.location.reload();
    }

    return (
        <Box sx={{ textAlign: 'center', border: '3px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h3" sx={Styles.Header}>Generate PDF</Typography>
            <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ m: 10, justifyContent: "center", alignItems: "center" }}>
                <Grid>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => downloadPDF()}
                        startIcon={<CheckCircleIcon />}
                    >
                        Download
                    </Button>
                </Grid>
                <Grid>
                    <Button variant="contained" size="large" startIcon={<CheckCircleIcon />} onClick={() => handleReset()}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                {pdfUrl && (
                    <Box sx={{ m: 4 }}>
                        <iframe src={`${pdfUrl}#toolbar=0`} width="100%" height="700px" style={{ border: 'none' }} />
                    </Box>
                )}
            </Box>
        </Box>
    )
};
