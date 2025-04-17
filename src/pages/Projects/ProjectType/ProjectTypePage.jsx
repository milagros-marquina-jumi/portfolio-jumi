import { useMemo } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getAllProjects, getProjecByType } from "../../../data/projects"
import ProyectoItem from './../../../components/ProjectItem'
import './project_type.css'
import { useTranslation } from "react-i18next"

export function ProjectTypePage() {
    const [t, i18n] = useTranslation("global");
    const [searchParams, setSearchParams] = useSearchParams();
    const projects = getAllProjects();
    const { projectType } = useParams();
    const projectId = useMemo(() => getProjecByType(projectType), [projectType]);

    const handleChange = (e) => {
        setSearchParams({ filter: e.target.value });
    };

    const filter = searchParams.get("filter") ?? "";

    const {
        type
    } = projectId;

    return (
        <div>
            <div className="project-type">
                <form className="search">
                    <input
                        placeholder={t('project-type-page.search')}
                        type="text"
                        className="input-textarea"
                        maxLength="50"
                        value={filter}
                        onChange={handleChange}
                    />
                    <button
                        className="btn-search noSelect cursor-pointer"
                        type="reset"
                        onChange={handleChange}
                    ></button>
                </form>
                <br />
                <div className="projects-list noScrollBar">
                    {projects
                        .filter((project) => {
                            if (!filter) return true;
                            return project.name.toLowerCase().includes(filter.toLowerCase());
                        })
                        .map((project) => (
                            <div div key={project.id} >
                                <Link
                                    className="noSelect"
                                    to={`/projects/${type}/${project.id}`}
                                >
                                    <ProyectoItem
                                        imgClase={type}
                                        projects={project}
                                        type={project.type}
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}
