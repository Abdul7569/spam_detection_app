import React, { useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    AppBar,
    Toolbar,
    Paper,
    Tab,
    Tabs,
    useTheme,
} from "@mui/material";

function App() {
    const [message, setMessage] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [spamMessages, setSpamMessages] = useState([]);
    const [inboxMessages, setInboxMessages] = useState([]);
    const [manualMessages] = useState([
        { text: "Go until jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got amore wat...", label: "ham" },
        { text: "Ok lar... Joking wif u oni...", label: "ham" },
        { text: "Free entry in 2 a wkly comp to win FA Cup final tkts 21st May 2005. Text FA to 87121 to receive entry question(std txt rate)T&C's apply 08452810075over18's", label: "spam" },
        { text: "SIX chances to win CASH! From 100 to 20,000 pounds txt> CSH11 and send to 87575. Cost 150p/day, 6days, 16+ TsandCs apply Reply HL 4 info", label: "spam" },
        { text: "-U dun say so early hor... U c already then say...", label: "ham" },
    ]);

    const theme = useTheme();

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message) return;

        setLoading(true);
        try {
            const API_BASE_URL = process.env.REACT_APP_API_URL; // Ensure you set this in your .env file
            console.log("Hitting:", `${API_BASE_URL}/predict`);

            const response = await axios.post(`${API_BASE_URL}/predict`, {message,} // Send the message as part of the body
            );

            setPrediction(response.data.prediction);

            // Update the inbox or spam messages based on the prediction
            if (response.data.prediction === "spam") {
                setSpamMessages([...spamMessages, message]);
            } else {
                setInboxMessages([...inboxMessages, message]);
            }
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
        setLoading(false);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Spam Detection App
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container sx={{ textAlign: "center", mt: 5, mb: 5 }}>
                <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                    >
                        Spam Detection 🛑
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                        Enter a message to check if it is spam or not! 📩
                    </Typography>

                    {/* Input Field */}
                    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "left" }}>
                        <TextField
                            label="Enter Message"
                            variant="outlined"
                            fullWidth
                            value={message}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                },
                                transition: "transform 0.3s ease",
                                '&:focus-within': {
                                    transform: "scale(1.05)",
                                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                                },
                            }}
                            multiline
                            rows={4}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                mb: 2,
                                padding: "10px 20px",
                                textTransform: "none",
                                borderRadius: 3,
                                boxShadow: 2,
                                "&:hover": {
                                    boxShadow: 6,
                                    backgroundColor: theme.palette.primary.dark,
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            {loading ? "Submitting..." : "Submit 🚀"}
                        </Button>

                        <Typography sx={{ mt: 2, fontSize: "0.9rem", color: theme.palette.text.secondary }}>
                            <strong>Note:</strong> Only dataset messages will work. 📊
                        </Typography>

                        {prediction && (
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold",
                                    color: prediction === "spam" ? "red" : "green",
                                    fontSize: "1.2rem",
                                    animation: "fadeIn 1s ease-in",
                                }}
                            >
                                {prediction === "spam" ? "🚫 Spam Detected!" : "✅ Not Spam"}
                            </Typography>
                        )}
                    </Box>
                </Paper>

                {/* Manually Added Messages Section */}
                <Box mt={4}>
                    <Typography variant="h6" mb={2}>
                        Check with the below inputs, these form the `spam.csv` dataset:
                    </Typography>

                    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                        <Box>
                            {manualMessages.map((msg, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1.5, '&:last-child': { mb: 0 } }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
                                        Message {index + 1}:
                                    </Typography>
                                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                        {msg.text}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 'bold',
                                            ml: 2,
                                            color: msg.label === "spam" ? "red" : "green",
                                        }}
                                    >
                                        Label: {msg.label === "spam" ? "Spam 🚫" : "Ham ✅"}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>

                {/* Download Link for the CSV File */}
                <Box mt={4}>
                    <Typography variant="h6" mb={2}>
                        You can download the `spam.csv` dataset here:
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        href="/spam.csv"
                        download
                        sx={{
                            padding: "10px 20px",
                            textTransform: "none",
                            borderRadius: 3,
                            boxShadow: 2,
                            "&:hover": {
                                boxShadow: 6,
                                backgroundColor: theme.palette.secondary.dark,
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Download Dataset
                    </Button>
                </Box>

                {/* Tabs for Spam and Inbox */}
                <Box mt={4}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Inbox 📥" />
                        <Tab label="Spam 🚫" />
                    </Tabs>

                    {/* Display Messages based on Tab Selection */}
                    <Box mt={2}>
                        {activeTab === 0 ? (
                            <Box>
                                <Typography variant="h6">Inbox Messages</Typography>
                                {inboxMessages.length === 0 ? (
                                    <Typography>No messages in inbox</Typography>
                                ) : (
                                    inboxMessages.map((msg, index) => (
                                        <Typography key={index} sx={{ textAlign: 'left', mb: 1 }}>
                                            {`#${index + 1}: ${msg}`}
                                        </Typography>
                                    ))
                                )}
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant="h6">Spam Messages</Typography>
                                {spamMessages.length === 0 ? (
                                    <Typography>No spam messages detected</Typography>
                                ) : (
                                    spamMessages.map((msg, index) => (
                                        <Typography key={index} sx={{ textAlign: 'left', mb: 1 }}>
                                            {`#${index + 1}: ${msg}`}
                                        </Typography>
                                    ))
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default App;
