import { useEffect, useState } from "react";
import { Note } from "../../components/Note/Note";
import { NoteInfo } from "../../types/NoteInfo";
import "./Notes.scss";
import config from "../../config";

type Props = {}

const notes: NoteInfo[] = [
	{
		noteId: 69696969,
		title: "Algebra liniowa",
		dateAdded: Date.now(),
		university: "AGH",
		degreeCourse: "ISI",
		upvotes: 69
	},
	{
		noteId: 4202137,
		title: "Analiza matematyczna 1",
		dateAdded: Date.now(),
		university: "AGH",
		degreeCourse: "ISI",
		upvotes: 420
	}
];

const Notes = (props: Props): JSX.Element => {
	const [uni, setUni] = useState("");
	const [course, setCourse] = useState("");
	const [subject, setSubject] = useState("");
	const [search, setSearch] = useState("");
	const [uniList, setUniList] = useState<string[]>([]);
	const [courseList, setCourseList] = useState<string[]>([]);
	const [subjectList, setSubjectList] = useState<string[]>([]);


	const getUnis = () => {
		fetch(`http://${config.ip}/get_unis`, {
			method: 'GET'
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
		fetch(`http://${config.ip}/get_courses?` + new URLSearchParams({
			uni: uni
		}), {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				setCourseList(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	const getSubjects = () => {
		fetch(`http://${config.ip}/get_subjects?`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				setSubjectList(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	useEffect(getUnis, [])
	useEffect(getCourses, [uni])
	useEffect(getSubjects, [])

	return (
		<div id="notes">
			<div id="search">
				<input type="search" id="search-bar" value={search} onChange={(s) => setSearch(s.target.value)} />
				<select name="uni" id="uni-select" value={uni} onChange={(u) => setUni(u.target.value)}>
					{
						uniList.map((e) => {
							return (<option value={e}>{e}</option>)
						})
					}
				</select>
				<select name="course" id="course-select" value={course} onChange={(c) => setCourse(c.target.value)}>
					{
						courseList.map((e) => {
							return (<option value={e}>{e}</option>)
						})
					}
				</select>
				<select name="subject" id="subject-select" value={subject} onChange={(s) => setSubject(s.target.value)}>
					{
						subjectList.map((e) => {
							return (<option value={e}>{e}</option>)
						})
					}
				</select>
			</div>
			<div id="tiles">
				{notes.map(n =>
					<Note
						key={n.noteId}
						noteId={n.noteId}
						title={n.title}
						dateAdded={n.dateAdded}
						university={n.university}
						degreeCourse={n.degreeCourse}
						upvotes={n.upvotes}
					/>
				)}
			</div>
		</div>
	);
}

export { Notes };