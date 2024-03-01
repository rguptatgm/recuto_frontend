import { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";

import FilledButton from '../../components/input.components/filled.button.component/filled.button.component';
import MainLayout from '../../components/layout.components/main.layout/main.layout';
import PageContainer from '../../components/layout.components/page.container.component/page.container.component';
import OutlinedTextArea from "../../components/input.components/outlined.text.area.component/outlined.text.area.component.tsx";

const InterviewParticipate = () => {
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isRecordingBlinking, setIsRecordingBlinking] = useState(false);
    const [isInterviewFinished, setIsInterviewFinished] = useState(false);
    const [isStartConfirmed, setIsStartConfirmed] = useState(false);
    const [remainingTime, setRemainingTime] = useState(180);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = [
        "Question 1",
        "Question 2",
        "Question 3"
    ]

    useEffect(() => {
        let blinkInterval: any;
        if(isRecording) {
            blinkInterval = setInterval(() => {
                setIsRecordingBlinking(prev => !prev);
            }, 1000);
        } else {
            setIsRecordingBlinking(false);
        }

        return () => clearInterval(blinkInterval);
    }, [isRecording]);

    useEffect(() => {
        setRemainingTime(180);
    },[currentQuestion]);
    
    useEffect(() => {
        const timerId = setInterval(() => {
            setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, [currentQuestion]);

    const handleStartClick = () => {
        console.log("Start button clicked");
        setIsStartConfirmed(true);
    };

    const startCamera = () => {
        setIsCameraOn(true);
    };

    const stopCamera = () => {
        setIsCameraOn(false);
        if(mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const startRecording = () => {
        if(webcamRef.current) {
            const stream = webcamRef.current.stream;
            if(stream) {

                setRecordedChunks([]);
                
                const options = { mimeType: 'video/webm' };
                const mediaRecorder = new MediaRecorder(stream, options);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.start();
                setIsRecording(true);
            }
        }

    };

    const stopRecording = () => {
        if(mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleDataAvailable = (event : BlobEvent) => {
        if(event.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(event.data));
        }
    };

    const handleDownload = () => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `interview_${timestamp}.webm`;

        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    
    const handleNextClick = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
        } else {
            setIsInterviewFinished(true);
            setRemainingTime(0); // Set remainingTime to 0 when interview is finished
        }
    };

    if (!isStartConfirmed) {
        return (
            <MainLayout>
                <PageContainer>
                    <h1>Interview Start Bestätigung</h1>
                    <br />
                    <p>Bitte bestätigen Sie den Start des Interviews durch Klicken auf die Schaltfläche "Start".</p>
                    <br />
                    <FilledButton
                        color="primary"
                        label="Start"
                        className="mt-15 mb-15 full-width"
                        onClick={handleStartClick}
                    />
                </PageContainer>
            </MainLayout>
        );
    }

    if (isInterviewFinished) {
        return (
            <MainLayout>
                <PageContainer>
                    <h1>Vielen Dank für Ihre Teilnahme</h1>
                    <br />
                    <p>Das Interview ist abgeschlossen. Wir danken Ihnen für Ihre Zeit und Ihre Antworten.</p>
                </PageContainer>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <PageContainer>
                <style>
                    {`
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0.7; }
                        100% { opacity: 1; }
                    }
                      
                    .blink {
                        animation: blink 1s infinite;
                    }
                    `}
                </style>
                <h1>Interview Frage - Seite {currentQuestion + 1}</h1>
                <br />
                <p>Verbleibende Zeit: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</p>
                <br />
                <OutlinedTextArea
                    label="Frage beantworten"
                    placeholder={questions[currentQuestion]}
                />
                {!isCameraOn ? (
                    <FilledButton
                        color="primary"
                        type="submit"
                        label={'Kamera starten'}
                        className="mt-15 mb-15"
                        onClick={startCamera}
                    />
                ) : (
                    <>
                        <FilledButton
                            color={isRecording ? 'danger' : 'secondary'}
                            type="button"
                            label={isRecording ? 'Aufnahme stoppen' : 'Aufnahme starten'}
                            className={`mt-15 mb-15 ${isRecording && isRecordingBlinking ? 'blink' : ''}`}
                            onClick={isRecording ? stopRecording : startRecording}
                        />
                        <FilledButton
                            color="secondary"
                            type="button"
                            label={'Kamera stoppen'}
                            className="mt-15 mb-15 ml-10"
                            onClick={stopCamera}
                        />
                    </>
                )}
                {isCameraOn && (
                    <>
                        <Webcam
                            audio={true}
                            ref={webcamRef}
                            mirrored={true}
                            style={{ display: 'block' }}
                        />
                        {recordedChunks.length > 0 && (
                            <FilledButton
                                color="primary"
                                type="button"
                                label={'Download'}
                                className="mt-15"
                                onClick={handleDownload}
                            />
                        )}
                    </>
                )}
                <FilledButton
                    color="primary"
                    type="submit"
                    label={currentQuestion === questions.length - 1 ? "Beenden" : "Weiter"}
                    className="mt-15 mb-15 full-width"
                    onClick={handleNextClick}
                />
            </PageContainer>
        </MainLayout>
    );
};

export default InterviewParticipate;