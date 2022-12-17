import { useEffect, useState } from "react";
import { Exercise } from "../../components/Exercise/Exercise";
import { ExerciseInfo } from "../../types/ExerciseInfo";
import "./Exercises.scss";
import config from "../../config";

type Props = {}

type General = {
    id: number,
    name: string
}

const Exercises = (props: Props): JSX.Element => {
    const [uni, setUni] = useState<number>(-1);
    const [course, setCourse] = useState<number>(-1);
    const [subject, setSubject] = useState<number>(-1);
    const [uniList, setUniList] = useState<General[]>([]);
    const [courseList, setCourseList] = useState<General[]>([]);
    const [subjectList, setSubjectList] = useState<General[]>([]);
    const [exercises, setExercises] = useState<ExerciseInfo[]>([]);

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

    const getExercises = () => {
        var formData = new FormData();
        formData.append("uni", uni.toString());
        formData.append("course", course.toString())
        formData.append("subject", subject.toString())

        fetch(`http://${config.ip}/get_questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                "id_university": uni.toString(),
                "id_degree_course": course.toString(),
                "id_subject": subject.toString()
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setExercises(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(getSubjects, [])
    useEffect(getUnis, [])
    useEffect(getCourses, [uni])
    useEffect(getExercises, [uni, course, subject])

    return (
        <div id="exercises">
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
            <div id="tiles">
                {exercises.map(n =>
                    <Exercise
                        key={n.id}
                        id={n.id}
                        title={n.title}
                        timestamp={n.timestamp}
                        university={n.university}
                        degree_course={n.degree_course}
                        points={n.points}
                        username={n.username}
                        subject={n.subject}
                        content={n.content}
                        exercise_set={n.exercise_set}
                    />
                )}
            </div>
        </div>
    );
}

export { Exercises };