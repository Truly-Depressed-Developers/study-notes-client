import "./EditableNote.scss";

import { TextField, Button, Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config";

type Props = { userId: number };

type General = {
    id: number,
    name: string
}

const EditableNote = (props: Props): JSX.Element => {
    const navigate = useNavigate();
    const [uni, setUni] = useState<number>(-1);
    const [course, setCourse] = useState<number>(-1);
    const [subject, setSubject] = useState<number>(-1);
    const [uniList, setUniList] = useState<General[]>([]);
    const [courseList, setCourseList] = useState<General[]>([]);
    const [subjectList, setSubjectList] = useState<General[]>([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [noDataError, setNoDataError] = useState(false);

    const getUnis = () => {
        fetch(`http://${config.ip}/get_universities`, {
            method: "POST"
        })
            .then((response) => response.json())
            .then((data) => {
                setUniList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getCourses = () => {
        fetch(`http://${config.ip}/get_courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_university: uni.toString()
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setCourseList(data);
                setCourse(-1);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getSubjects = () => {
        fetch(`http://${config.ip}/get_subjects`, {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                setSubjectList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(getSubjects, [])
    useEffect(getUnis, [])
    useEffect(getCourses, [uni])


    const submitForm = () => {
        setNoDataError(false);

        if (title !== "" && url !== "" && course !== 0 && subject !== 0) {
            fetch(`http://${config.ip}/add_note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    "id_author": props.userId.toString(),
                    "id_degree_course": course.toString(),
                    "id_subject": subject.toString(),
                    "title": title,
                    "url": url,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status === true) {
                        navigate("/notes");
                    } else {
                        console.log("Nie udało się dodać notatki")
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setNoDataError(true);
        }
    }

    return (
        <div className="editable-node">

            <FormControl fullWidth>
                <InputLabel id="university-select">University</InputLabel>
                <Select
                    labelId="university-select"
                    id="demo-simple-select"
                    value={uni == -1 ? "" : uni}
                    label="University"
                    onChange={(e) => setUni(parseInt(e.target.value as string))}
                >
                    {
                        uniList.map((e) => {
                            return (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
            <FormControl fullWidth disabled={uni == -1}>
                <InputLabel id="course-select">Course</InputLabel>
                <Select
                    labelId="course-select"
                    id="demo-simple-select"
                    value={course == -1 ? "" : course}
                    label="Course"
                    onChange={(e) => setCourse(parseInt(e.target.value as string))}
                >
                    {
                        courseList.map((e) => {
                            return (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="course-select">Subject</InputLabel>
                <Select
                    labelId="subject-select"
                    id="demo-simple-select"
                    value={subject == -1 ? "" : subject}
                    label="Subject"
                    onChange={(e) => setSubject(parseInt(e.target.value as string))}
                >
                    {
                        subjectList.map((e) => {
                            return (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>

            <TextField
                id="title-input"
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(l) => setTitle(l.target.value)}
            />
            <TextField
                id="url-input"
                label="Url"
                variant="outlined"
                fullWidth
                value={url}
                onChange={(l) => setUrl(l.target.value)}
            />
            {noDataError ? <Alert
                severity="warning"
                className="error-message"
            >Please provide input data!</Alert> : ""}
            <Button
                variant="contained"
                fullWidth
                onClick={() => submitForm()}
            >Add note</Button>
        </div>
    );
}

export { EditableNote };