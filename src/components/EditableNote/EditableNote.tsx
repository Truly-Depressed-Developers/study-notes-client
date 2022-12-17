import "./EditableNote.scss";

import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config";

type Props = {};

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
                    "id_author": "3",
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
        <div>
            <div id="search">
                <select name="uni" id="uni-select" value={uni} onChange={(e) => setUni(parseInt(e.target.value))}>
                    <option value={-1}></option>
                    {
                        uniList.map((e) => {
                            return (<option key={e.id} value={e.id}>{e.name}</option>)
                        })
                    }
                </select>
                <select name="course" id="course-select" value={course} onChange={(e) => setCourse(parseInt(e.target.value))}>
                    <option value={-1}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                    {
                        courseList.map((e) => {
                            return (<option key={e.id} value={e.id}>{e.name}</option>)
                        })
                    }
                </select>
                <select name="subject" id="subject-select" value={subject} onChange={(e) => setSubject(parseInt(e.target.value))}>
                    <option value={-1}></option>

                    {
                        subjectList.map((e) => {
                            return (<option key={e.id} value={e.id}>{e.name}</option>)
                        })
                    }
                </select>
            </div>
            <TextField
                id="title-input"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(l) => setTitle(l.target.value)}
            />
            <TextField
                id="url-input"
                label="Url"
                variant="outlined"
                value={url}
                onChange={(l) => setUrl(l.target.value)}
            />
            {noDataError ? <Alert
                severity="warning"
                className="error-message"
            >Please provide input data!</Alert> : ""}
            <Button
                variant="contained"
                onClick={() => submitForm()}
            >Add note</Button>
        </div>
    );
}

export { EditableNote };